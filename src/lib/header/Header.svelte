<script lang="ts">
	import { page } from '$app/stores';
	import { query } from '$src/stores';

	let queryValue = '';

	$: query.set(queryValue);
</script>

<header class="flex justify-between">
	<div class="corner">
		<h1>
			<a href="https://kit.svelte.dev"> Spells✨ </a>
		</h1>
	</div>

	<div class="">
		<input type="text" placeholder="Search..." bind:value={queryValue} />
	</div>

	<nav class="corner">
		<!-- TODO put something else here? github link? -->
		<li class:active={$page.url.pathname === '/'}>
			<a sveltekit:prefetch href="/">Prepared Spells</a>
		</li>
	</nav>
</header>

<style>
</style>
