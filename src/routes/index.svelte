<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Spells from '$lib/spells/Spells.svelte';
	import { spells } from '$src/stores';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<Spells spells={$spells} />
</section>

<style>
</style>
