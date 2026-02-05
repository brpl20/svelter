#!/usr/bin/env python3
"""
Transcribe all audio files recursively using Groq's Whisper API.
Splits large files into chunks using ffmpeg.

Usage: .venv/bin/python transcribe_all.py
"""

import os
import sys
import subprocess
import tempfile
from pathlib import Path

try:
    from groq import Groq
except ImportError:
    print("Error: groq package not installed.")
    print("Run: .venv/bin/pip install groq")
    sys.exit(1)

# Configuration
MAX_SIZE_MB = 24  # Stay under 25MB limit
CHUNK_DURATION_MINS = 10  # Split into 10-minute chunks for large files
MODEL = "whisper-large-v3-turbo"  # Faster and cheaper ($0.04/hr vs $0.111/hr)

# Audio extensions to process
AUDIO_EXTENSIONS = {".mp3", ".m4a", ".wav", ".webm", ".mp4", ".mpga", ".mpeg", ".ogg", ".flac"}


def load_api_key():
    env_path = Path.home() / "code" / "env"
    with open(env_path) as f:
        for line in f:
            if line.startswith("GROK="):
                return line.strip().split("=", 1)[1]
    raise ValueError("GROK API key not found in ~/code/env")


def get_audio_duration(audio_path: Path) -> float:
    """Get duration of audio file in seconds using ffprobe."""
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(audio_path)],
        capture_output=True, text=True
    )
    return float(result.stdout.strip())


def split_audio(audio_path: Path, chunk_duration_secs: int, output_dir: Path) -> list[Path]:
    """Split audio file into chunks using ffmpeg."""
    chunks = []
    duration = get_audio_duration(audio_path)

    for i, start in enumerate(range(0, int(duration) + 1, chunk_duration_secs)):
        chunk_path = output_dir / f"chunk_{i:03d}.mp3"
        subprocess.run([
            "ffmpeg", "-y", "-i", str(audio_path),
            "-ss", str(start), "-t", str(chunk_duration_secs),
            "-acodec", "libmp3lame", "-b:a", "64k",  # Lower bitrate to reduce size
            str(chunk_path)
        ], capture_output=True)

        if chunk_path.exists() and chunk_path.stat().st_size > 0:
            chunks.append(chunk_path)

    return chunks


def transcribe_file(client, audio_path: Path) -> str:
    """Transcribe a single audio file using Groq Whisper."""
    with open(audio_path, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            file=(audio_path.name, audio_file.read()),
            model=MODEL,
            response_format="text",
        )
    return transcription


def transcribe_large_file(client, audio_path: Path) -> str:
    """Transcribe a large file by splitting it into chunks."""
    with tempfile.TemporaryDirectory() as tmp_dir:
        tmp_path = Path(tmp_dir)
        chunk_duration = CHUNK_DURATION_MINS * 60

        print(f"    Splitting into {CHUNK_DURATION_MINS}-min chunks...")
        chunks = split_audio(audio_path, chunk_duration, tmp_path)

        transcripts = []
        for i, chunk in enumerate(chunks):
            chunk_size = chunk.stat().st_size / (1024 * 1024)
            print(f"    Chunk {i+1}/{len(chunks)} ({chunk_size:.1f}MB)...")

            # If chunk still too large, skip it
            if chunk_size > MAX_SIZE_MB:
                print(f"    WARNING: Chunk still too large, skipping...")
                continue

            transcript = transcribe_file(client, chunk)
            transcripts.append(transcript)

        return "\n\n".join(transcripts)


def process_directory(root_dir: Path):
    """Recursively process all audio files in directory."""
    api_key = load_api_key()
    client = Groq(api_key=api_key)

    audio_files = []
    for ext in AUDIO_EXTENSIONS:
        audio_files.extend(root_dir.rglob(f"*{ext}"))

    total = len(audio_files)
    print(f"Found {total} audio files to process")
    print(f"Using model: {MODEL}\n")

    skipped = 0
    processed = 0
    failed = 0

    for i, audio_path in enumerate(sorted(audio_files), 1):
        transcript_path = audio_path.with_suffix(".txt")

        if transcript_path.exists():
            print(f"[{i}/{total}] SKIP (exists): {audio_path.name}")
            skipped += 1
            continue

        file_size_mb = audio_path.stat().st_size / (1024 * 1024)
        print(f"[{i}/{total}] Transcribing ({file_size_mb:.1f}MB): {audio_path.name}")

        try:
            if file_size_mb > MAX_SIZE_MB:
                transcript = transcribe_large_file(client, audio_path)
            else:
                transcript = transcribe_file(client, audio_path)

            with open(transcript_path, "w", encoding="utf-8") as f:
                f.write(transcript)

            print(f"  Saved: {transcript_path.name}")
            processed += 1

        except Exception as e:
            print(f"  ERROR: {e}")
            failed += 1

    print(f"\n{'='*50}")
    print(f"Summary:")
    print(f"  Total files:  {total}")
    print(f"  Processed:    {processed}")
    print(f"  Skipped:      {skipped}")
    print(f"  Failed:       {failed}")


if __name__ == "__main__":
    root = Path.cwd()
    if len(sys.argv) > 1:
        root = Path(sys.argv[1])

    print(f"Starting transcription in: {root}\n")
    process_directory(root)
