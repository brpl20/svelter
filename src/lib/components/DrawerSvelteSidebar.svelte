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
