#!/bin/bash

# Delete all MP3 files recursively from the current directory

find . -type f -name "*.mp3" -delete

echo "All MP3 files have been deleted."
