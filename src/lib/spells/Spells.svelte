<script script lang="ts">
	import SpellCard from './SpellCard.svelte';
	import {
		queryClass,
		queryLevel,
		queryName,
		querySchool,
		spellSortDirection,
		spellSortFn,
		spellSortMethod
	} from '$src/stores';
	import type { ISpell } from '$src/types';

	export let spells: ISpell[] = [];

	const sortFn = (a: any, b: any) => {
		if (a < b) {
			return -sortDir;
		} else if (a > b) {
			return sortDir;
		} else {
			return 0;
		}
	};

	$: sortDir = $spellSortDirection === 'ASC' ? 1 : -1;

	$: switch ($spellSortMethod) {
		case 'LEVEL':
			$spellSortFn = (a, b) => sortFn(a.level, b.level);
			break;
		case 'NAME':
			$spellSortFn = (a, b) => sortFn(a.name, b.name);
			break;
	}

	$: filteredSpells = spells
		.filter((s) => s.name.toLowerCase().startsWith($queryName.toLowerCase()))
		.filter((s) => $queryLevel < 0 || s.level === $queryLevel)
		.filter((s) => $querySchool == null || s.school === $querySchool)
		.filter((s) => $queryClass == null || s.class.includes($queryClass))
		.sort($spellSortFn);
</script>

<div class="pt-2 grid gaps-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
	{#each filteredSpells as spell}
		<SpellCard {spell} />
	{/each}
</div>
