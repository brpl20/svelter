<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import DrawerSvelte from '$lib/components/DrawerSvelte.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Curso Svelte & SvelteKit</title>
</svelte:head>

<DrawerSvelte>
	{@render children()}
</DrawerSvelte>
