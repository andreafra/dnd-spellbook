<script lang="ts">
	import { capitalize, getLevelSuffix } from '$lib/spells/_api';
	import { queryClass, queryLevel, queryName, querySchool, spellSortDirection } from '$src/stores';
	import { SpellClasses, SpellSchools } from '$src/types';
</script>

<div class="space-y-1 md:space-x-1">
	<input
		type="text"
		placeholder="Search..."
		bind:value={$queryName}
		class="self-center w-full md:w-auto inline-block px-4 py-2 rounded-full bg-red-300 placeholder:text-red-50 text-base h-10"
	/>
	<select
		bind:value={$queryLevel}
		class="self-center w-full md:w-auto px-4 py-2 rounded-full bg-red-300 text-red-900 text-base h-10 cursor-pointer"
	>
		<option value={-1}>Any Level</option>
		<option value={0}>Cantrip</option>
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as val}
			<option value={val}>{val}{getLevelSuffix(val)}-level</option>
		{/each}
	</select>
	<select
		bind:value={$querySchool}
		class="self-center w-full md:w-auto px-4 py-2 rounded-full bg-red-300 text-red-900 text-base h-10 cursor-pointer"
	>
		<option value={null}>Any School</option>
		{#each SpellSchools as val}
			<option value={val}>{capitalize(val)}</option>
		{/each}
	</select>
	<select
		bind:value={$queryClass}
		class="self-center w-full md:w-auto px-4 py-2 rounded-full bg-red-300 text-red-900 text-base h-10 cursor-pointer"
	>
		<option value={null}>Any Class</option>
		{#each SpellClasses as val}
			<option value={val}>{capitalize(val)}</option>
		{/each}
	</select>
</div>
