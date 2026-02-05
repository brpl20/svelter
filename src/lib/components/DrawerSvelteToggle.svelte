<script>
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { modules } from '$lib/course-data.js';

	let { drawerId = 'sidebar-drawer' } = $props();

	let currentLesson = $derived.by(() => {
		const path = page.url.pathname;
		for (const mod of modules) {
			for (const lesson of mod.lessons) {
				if (path === `/lessons/${mod.slug}/${lesson.slug}`) {
					return { mod, lesson };
				}
			}
		}
		return null;
	});
</script>

<header class="navbar bg-base-200/90 backdrop-blur-md border-b border-base-300 sticky top-0 z-30">
	<!-- Left: hamburger (mobile) -->
	<div class="flex-none lg:hidden">
		<label for={drawerId} class="btn btn-square btn-ghost text-[--color-svelte] hover:bg-[--color-svelte]/10">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 stroke-current">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		</label>
	</div>

	<!-- Center-left: logo + title -->
	<div class="flex-1">
		<a href="/" class="flex items-center gap-2.5 px-2 group">
			<img
				src={favicon}
				alt="Svelte"
				class="w-7 h-7 transition-transform group-hover:rotate-12 group-hover:scale-110"
			/>
			<span class="font-bold text-lg tracking-tight">
				<span class="text-base-content">Curso</span>
				<span class="text-[--color-svelte]">Svelte</span>
			</span>
		</a>
	</div>

	<!-- Right: breadcrumb (desktop, lesson pages) -->
	{#if currentLesson}
		<div class="hidden lg:flex items-center gap-2 text-sm mr-2">
			<span class="badge badge-ghost badge-sm font-mono">Modulo {String(currentLesson.mod.id).padStart(2, '0')}</span>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current opacity-40">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
			</svg>
			<span class="font-mono text-xs opacity-50">{currentLesson.mod.id}.{currentLesson.lesson.order}</span>
			<span class="opacity-70 max-w-xs truncate">{currentLesson.lesson.title}</span>
		</div>
	{/if}

	<!-- Right: progress + github -->
	<div class="flex-none flex items-center gap-2">
		<div class="hidden sm:flex items-center gap-1.5 text-xs opacity-50 mr-2">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
			</svg>
			<span>{modules.reduce((a, m) => a + m.lessons.length, 0)} aulas</span>
		</div>
		<a
			href="https://svelte.dev"
			target="_blank"
			rel="noopener noreferrer"
			class="btn btn-ghost btn-sm btn-square opacity-60 hover:opacity-100 hover:text-[--color-svelte]"
			title="Svelte Docs"
		>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-5 h-5 stroke-current">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
			</svg>
		</a>
	</div>
</header>
