<script>
	import { modules } from '$lib/course-data.js';
	import favicon from '$lib/assets/favicon.svg';
</script>

<div class="hero min-h-[70vh] relative overflow-hidden">
	<div class="absolute inset-0 opacity-5">
		<div class="absolute top-10 left-10 w-64 h-64 rounded-full bg-[--color-svelte] blur-3xl"></div>
		<div class="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[--color-svelte] blur-3xl"></div>
	</div>

	<div class="hero-content text-center relative z-10">
		<div class="max-w-2xl">
			<img src={favicon} alt="Svelte logo" class="w-20 h-20 mx-auto mb-6 drop-shadow-lg" />
			<h1 class="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
				Curso Completo de<br />
				<span class="bg-gradient-to-r from-[--color-svelte] to-[--color-svelte-light] bg-clip-text text-transparent">Svelte</span>
				<span class="text-base-content/40">&</span>
				<span class="bg-gradient-to-r from-[--color-svelte-light] to-[--color-accent] bg-clip-text text-transparent">SvelteKit</span>
			</h1>
			<p class="py-6 text-lg opacity-80 leading-relaxed">
				Do zero ao deploy &mdash; construa aplicacoes web modernas, reativas e performaticas.
			</p>
			<div class="flex gap-3 justify-center flex-wrap">
				<a href="/lessons/{modules[0].slug}/{modules[0].lessons[0].slug}" class="btn btn-primary btn-lg">
					Comecar Agora
				</a>
				<label for="sidebar-drawer" class="btn btn-outline btn-lg lg:hidden">
					Ver Modulos
				</label>
			</div>
			<div class="mt-8 flex gap-6 justify-center text-sm opacity-60">
				<span>{modules.length} modulos</span>
				<span>&bull;</span>
				<span>{modules.reduce((acc, m) => acc + m.lessons.length, 0)} aulas</span>
				<span>&bull;</span>
				<span>Svelte 5 + SvelteKit</span>
			</div>
		</div>
	</div>
</div>

<section class="px-4 py-12 max-w-6xl mx-auto">
	<div class="flex items-center gap-3 mb-2">
		<div class="w-1.5 h-8 rounded-full bg-[--color-svelte]"></div>
		<h2 class="text-3xl font-bold tracking-tight">Modulos do Curso</h2>
	</div>
	<p class="opacity-60 mb-8 ml-5">Selecione um modulo para comecar a estudar.</p>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each modules as mod, i (mod.id)}
			<div class="card bg-base-200 border border-base-300 hover:border-[--color-svelte]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[--color-svelte]/5">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-2">
						<span class="badge badge-primary badge-lg font-mono font-bold">
							{String(mod.id).padStart(2, '0')}
						</span>
						<h3 class="card-title text-lg">{mod.title}</h3>
					</div>
					<ul class="text-sm opacity-70 space-y-1 mt-2">
						{#each mod.lessons.slice(0, 3) as lesson (lesson.slug)}
							<li class="truncate">&bull; {lesson.title}</li>
						{/each}
						{#if mod.lessons.length > 3}
							<li class="opacity-50">+ {mod.lessons.length - 3} aulas...</li>
						{/if}
					</ul>
					<div class="card-actions justify-between items-center mt-4">
						<span class="text-xs opacity-50">{mod.lessons.length} aulas</span>
						<a href="/lessons/{mod.slug}/{mod.lessons[0].slug}" class="btn btn-primary btn-sm">
							Comecar
						</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
