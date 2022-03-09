<script lang="ts">
	import Filters from './Filters.svelte';

	import { page } from '$app/stores';

	import Icon from 'heroicons-for-svelte';
	import { Bookmark, Filter } from 'heroicons-for-svelte/icons/outline';

	let isFilterVisible = false;
</script>

<header class="py-2 space-y-2 sticky top-0 bg-red-100 opacity-100 z-50 border-b-2 border-red-900">
	<div class="flex justify-between">
		<div class="self-center">
			<h1 class="text-2xl font-bold text-red-900">
				<a href="/">Spells</a>
			</h1>
		</div>
		<nav class="self-center flex flex-row space-x-1">
			<!-- TODO put something else here? github link? -->
			<li
				class:active={$page.url.pathname === '/'}
				class="bg-red-300 rounded-full h-10 w-10 flex justify-center"
			>
				<button
					class="text-2xl self-center text-red-900"
					on:click={() => {
						isFilterVisible = !isFilterVisible;
					}}
				>
					<Icon icon={Filter} />
				</button>
			</li>
			<li
				class:active={$page.url.pathname === '/'}
				class="bg-red-300 rounded-full h-10 w-10 flex justify-center"
			>
				<a sveltekit:prefetch href="/prepared" class="text-2xl self-center text-red-900">
					<Icon icon={Bookmark} />
				</a>
			</li>
		</nav>
	</div>
	{#if isFilterVisible}
		<Filters />
	{/if}
</header>

<style>
	li {
		list-style: none;
	}
</style>
