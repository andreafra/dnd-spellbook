<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Spells from '$lib/spells/Spells.svelte';
	import { preparedSpellIds, spells } from '$src/stores';
	import type { ISpell } from '$src/types';

	let preparedSpells: ISpell[] = [];

	$: preparedSpells = $spells.filter((t) => $preparedSpellIds.includes(t._id));
</script>

<svelte:head>
	<title>DnD Spells</title>
</svelte:head>

<section>
	<Spells spells={preparedSpells} />
</section>

<style>
</style>
