<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import { db } from '$src/db';
	import { preparedSpellIds } from '$src/stores';
	import '@fontsource/crimson-pro';
	import '@fontsource/crimson-pro/900.css';
	import { onMount } from 'svelte';
	import '../app.css';

	import { fetchSpellData } from '$lib/spells/_api';
	import { spells } from '$src/stores';

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

		$preparedSpellIds = db.getPreparedSpells();
	});
</script>

<Header />

<main>
	<slot />
</main>

<footer>
	<p>Copyright stuffs here</p>
</footer>

<style>
	* {
		font-family: 'Crimson Pro';
	}
</style>
