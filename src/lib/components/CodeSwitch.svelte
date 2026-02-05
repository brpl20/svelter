<script>
	let { children } = $props();
	let active = $state('js');
</script>

<div class="code-switch not-prose my-6">
	<div class="flex border-b border-base-300">
		<button
			class="px-4 py-2 text-sm font-mono font-semibold transition-colors"
			class:active-tab={active === 'js'}
			class:inactive-tab={active !== 'js'}
			onclick={() => (active = 'js')}
		>
			JavaScript
		</button>
		<button
			class="px-4 py-2 text-sm font-mono font-semibold transition-colors"
			class:active-tab={active === 'ts'}
			class:inactive-tab={active !== 'ts'}
			onclick={() => (active = 'ts')}
		>
			TypeScript
		</button>
	</div>
	<div class="code-panels" data-active={active}>
		{@render children()}
	</div>
</div>

<style>
	.active-tab {
		color: var(--color-svelte);
		border-bottom: 2px solid var(--color-svelte);
	}
	.inactive-tab {
		color: oklch(60% 0.01 250);
		border-bottom: 2px solid transparent;
	}
	.inactive-tab:hover {
		color: oklch(80% 0.01 250);
	}
	.code-panels :global([data-lang]) {
		display: none;
	}
	.code-panels[data-active='js'] :global([data-lang='js']) {
		display: block;
	}
	.code-panels[data-active='ts'] :global([data-lang='ts']) {
		display: block;
	}
	.code-panels :global(pre) {
		margin-top: 0 !important;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
</style>
