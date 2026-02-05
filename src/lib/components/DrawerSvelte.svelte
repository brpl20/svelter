<script>
	import DrawerSvelteContent from './DrawerSvelteContent.svelte';
	import DrawerSvelteSidebar from './DrawerSvelteSidebar.svelte';

	let { children, drawerId = 'sidebar-drawer' } = $props();
</script>

<div class="drawer lg:drawer-open">
	<input id={drawerId} type="checkbox" class="drawer-toggle" />

	<DrawerSvelteContent {drawerId}>
		{@render children()}
	</DrawerSvelteContent>

	<DrawerSvelteSidebar {drawerId} />
</div>
