<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '@fontsource/crimson-pro';
	import '@fontsource/crimson-pro/900.css';
	import '../app.css';
</script>

<Header />

<main>
	<slot />
</main>

<footer>
	<p>Copyright stuffs here</p>
</footer>

<style>
	* {
		font-family: 'Crimson Pro';
	}
</style>
