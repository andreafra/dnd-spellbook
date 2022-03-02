<script lang="ts">
	import Filters from './Filters.svelte';

	import { page } from '$app/stores';

	import Icon from 'heroicons-for-svelte';
	import { BookOpen } from 'heroicons-for-svelte/icons/outline';
</script>

<header
	class="flex justify-between py-2 sticky top-0 bg-red-100 opacity-100 z-50 border-b-2 border-red-900"
>
	<div class="self-center">
		<h1 class="text-2xl font-bold text-red-900">
			<a href="/">Spells</a>
		</h1>
	</div>

	<div class="self-center flex">
		<Filters />
	</div>

	<nav class="self-center">
		<!-- TODO put something else here? github link? -->
		<li
			class:active={$page.url.pathname === '/'}
			class="bg-red-300 rounded-full h-10 w-10 flex justify-center"
		>
			<a sveltekit:prefetch href="/prepared" class="text-3xl self-center text-red-900">
				<Icon icon={BookOpen} />
			</a>
		</li>
	</nav>
</header>

<style>
	li {
		list-style: none;
	}
</style>
