<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Spells from '$lib/spells/Spells.svelte';
	import { fetchSpellData } from '$lib/spells/_api';
	import { db } from '$src/db';
	import { spells } from '$src/stores';
	import { onMount } from 'svelte';

	// Init db
	onMount(async () => {
		if (!db.isInitialized()) {
			try {
				console.log('Db is empty. Populating...');
				let _spells = await fetchSpellData();
				db.setSpells(_spells);
				$spells = _spells;
			} catch (err) {
				console.error(err);
			}
		} else {
			$spells = db.getSpells();
		}
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<Spells spells={$spells} />
</section>

<style>
</style>
