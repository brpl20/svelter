<script>
	import { modules } from '$lib/course-data.js';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';

	let { drawerId = 'sidebar-drawer' } = $props();
</script>

<div class="drawer-side">
	<label for={drawerId} aria-label="close sidebar" class="drawer-overlay"></label>
	<aside class="menu bg-base-200 text-base-content min-h-full w-80 p-4 border-r border-base-300">
		<div class="mb-6 px-2">
			<a href="/" class="flex items-center gap-3 group">
				<img src={favicon} alt="Svelte" class="w-8 h-8 group-hover:rotate-12 transition-transform" />
				<span class="text-lg font-bold">
					Curso <span class="text-[--color-svelte]">Svelte</span>
				</span>
			</a>
		</div>

		<li class="mt-4">
			<a
				href="/blog"
				class:active={page.url.pathname.startsWith('/blog')}
				class="text-sm font-semibold"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
				Blog
			</a>
		</li>

		<div class="divider my-2"></div>

		{#each modules as mod (mod.id)}
			<li class="menu-title mt-6">
				<div class="flex flex-col gap-0.5">
					<span class="font-mono text-xs opacity-50">Modulo {String(mod.id).padStart(2, '0')}</span>
					<span class="text-[--color-svelte] text-sm font-semibold">{mod.title}</span>
				</div>
			</li>
			{#each mod.lessons as lesson (lesson.slug)}
				{@const href = `/lessons/${mod.slug}/${lesson.slug}`}
				<li>
					<a
						{href}
						class:active={page.url.pathname === href}
						class="text-sm"
					>
						<span class="font-mono text-xs opacity-50 shrink-0">{mod.id}.{lesson.order}</span>
						{lesson.title}
					</a>
				</li>
			{/each}
		{/each}
	</aside>
</div>
