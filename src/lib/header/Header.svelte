<script lang="ts">
	import { page } from '$app/stores';
	import { capitalize, getLevelSuffix } from '$lib/spells/_api';
	import { queryClass, queryLevel, queryName, querySchool } from '$src/stores';
	import { ISpellClass, ISpellSchool } from '$src/types';

	import Icon from 'heroicons-for-svelte';
	import { BookOpen } from 'heroicons-for-svelte/icons/outline';

	const schools = [];
	for (let _school in ISpellSchool) {
		if (isNaN(Number(_school))) schools.push(capitalize(_school));
	}
	const classes = [];
	for (let _class in ISpellClass) {
		if (isNaN(Number(_class))) classes.push(capitalize(_class));
	}

	let _queryLevel, _queryClass, _querySchool;

	$: $queryLevel = _queryLevel as number;
	$: $queryClass = ISpellClass[String(_queryClass)] as ISpellClass;
	$: $querySchool = ISpellSchool[String(_querySchool)] as ISpellSchool;
</script>

<header class="flex justify-between py-2">
	<div class="self-center">
		<h1 class="text-2xl font-bold text-red-900">
			<a href="/">Spells</a>
		</h1>
	</div>

	<div class="self-center">
		<input
			type="text"
			placeholder="Search..."
			bind:value={$queryName}
			class="px-4 py-2 rounded-full bg-red-300 placeholder:text-red-50 text-base h-10"
		/>
		<select
			bind:value={_queryLevel}
			class="px-4 py-2 rounded-full bg-red-300 text-red-900 text-base h-10"
		>
			<option value={-1}>Any Level</option>
			<option value={0}>Cantrip</option>
			{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as val}
				<option value={val}>{val}{getLevelSuffix(val)}-level</option>
			{/each}
		</select>
		<select
			bind:value={_querySchool}
			class="px-4 py-2 rounded-full bg-red-300 text-red-900 text-base h-10"
		>
			<option value={null}>Any School</option>
			{#each schools as val}
				<option value={val}>{val}</option>
			{/each}
		</select>
		<select
			bind:value={_queryClass}
			class="px-4 py-2 rounded-full bg-red-300 text-red-900 text-base h-10"
		>
			<option value={null}>Any Class</option>
			{#each classes as val}
				<option value={val}>{val}</option>
			{/each}
		</select>
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
