<script lang="ts">
	import { page } from '$app/stores';
	import { getLevelSuffix, getSchoolName } from '$lib/spells/_api';
	import { queryClass, queryLevel, queryName, querySchool } from '$src/stores';
	import { ISpellClass, ISpellSchool } from '$src/types';

	const SCHOOLS = [
		'BARD',
		'CLERIC',
		'DRUID',
		'PALADIN',
		'RANGER',
		'RITUAL_CASTER',
		'SORCERER',
		'WARLOCK',
		'WIZARD'
	];
	const CLASSES = [
		'ABJURATION',
		'CONJURATION',
		'DIVINATION',
		'ENCHANTMENT',
		'EVOCATION',
		'ILLUSION',
		'NECROMANCY',
		'TRANSMUTATION'
	];
</script>

<header class="flex justify-between">
	<div class="corner">
		<h1>
			<a href="https://kit.svelte.dev"> Spells✨ </a>
		</h1>
	</div>

	<div class="">
		<input
			type="text"
			placeholder="Search..."
			bind:value={$queryName}
			class="px-4 py-2 rounded-full"
		/>
		<select bind:value={$queryLevel} class="px-4 py-2 rounded-full">
			<option value={-1}>Any Level</option>
			<option value={-1}>Cantrip</option>
			{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as val}
				<option value={val}>{val}{getLevelSuffix(val)}-level</option>
			{/each}
		</select>
		<select bind:value={$querySchool} class="px-4 py-2 rounded-full">
			<option value={null}>Any School</option>
			{#each SCHOOLS as val}
				<option value={val}>{val}</option>
			{/each}
		</select>
		<select bind:value={$queryClass} class="px-4 py-2 rounded-full">
			<option value={null}>Any Class</option>
			{#each CLASSES as val}
				<option value={val}>{val}</option>
			{/each}
		</select>
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
