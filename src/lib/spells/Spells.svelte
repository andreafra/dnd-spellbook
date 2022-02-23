<script script lang="ts">
	import SpellCard from './SpellCard.svelte';
	import { queryClass, queryLevel, queryName, querySchool, spells } from '$src/stores';

	$: filteredSpells = $spells
		.filter((s) => s.name.toLowerCase().startsWith($queryName.toLowerCase()))
		.filter((s) => $queryLevel < 0 || s.level === $queryLevel)
		.filter((s) => $querySchool == null || s.school == $querySchool)
		.filter((s) => $queryClass == null || s.class.includes($queryClass));
</script>

<div class="grid gaps-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
	{#each filteredSpells as _spell}
		<SpellCard spell={_spell} />
	{/each}
</div>
