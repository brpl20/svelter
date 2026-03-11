<script>
	let { data } = $props();
</script>

<div class="not-prose max-w-4xl mx-auto px-4 py-12">
	<div class="flex items-center gap-3 mb-2">
		<div class="w-1.5 h-8 rounded-full bg-[--color-svelte]"></div>
		<h1 class="text-3xl font-bold tracking-tight">Blog</h1>
	</div>
	<p class="opacity-60 mb-10 ml-5">Novidades, dicas e tudo sobre o ecossistema Svelte.</p>

	<div class="space-y-6">
		{#each data.posts as post (post.slug)}
			<a
				href="/blog/{post.slug}"
				class="block card bg-base-200 border border-base-300 hover:border-[--color-svelte]/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[--color-svelte]/5"
			>
				<div class="card-body">
					<div class="flex items-center gap-3 mb-1">
						<span class="text-xs font-mono opacity-50">{post.date}</span>
						{#each post.tags as tag (tag)}
							<span class="badge badge-sm badge-outline">{tag}</span>
						{/each}
					</div>
					<h2 class="card-title text-xl">{post.title}</h2>
					{#if post.summary}
						<p class="opacity-70 text-sm">{post.summary}</p>
					{/if}
				</div>
			</a>
		{/each}
	</div>
</div>
