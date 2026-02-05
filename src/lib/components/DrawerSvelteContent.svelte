<script>
	import DrawerSvelteToggle from './DrawerSvelteToggle.svelte';

	let { children, drawerId = 'sidebar-drawer' } = $props();
</script>

<div class="drawer-content flex flex-col">
	<DrawerSvelteToggle {drawerId} />

	<main class="flex-1 p-6">
		{@render children()}
	</main>
</div>
