<script script lang="ts">
	import { filteredSpells, spells } from '$src/stores';

	import { onMount } from 'svelte';
	import { fetchSpellData, getLevelSuffix, getSchoolName } from './_api';

	onMount(async () => {
		spells.set(await fetchSpellData());
	});
</script>

<div class="grid gaps-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
	{#each $filteredSpells as spell}
		<li>
			<h3 class="font-bold">
				{spell.name}
			</h3>
			<p>
				<i>
					{spell.level === 0
						? `${getSchoolName(spell.school)} cantrip`
						: `${spell.level}${getLevelSuffix(spell.level)}-level ${getSchoolName(spell.school)}`}
				</i>
			</p>
			<p><b>Casting Time: </b>{spell.castingTime}</p>
			<p><b>Range: </b>{spell.range}</p>
			<p>
				<b>Components: </b>{spell.components}
				{spell.materials === '' ? '' : `(${spell.materials})`}
			</p>
			<p>
				<b>Duration: </b>{spell.concentration
					? `Concentration, ${spell.duration.toLowerCase()}`
					: spell.duration}
			</p>
			<div class="relative indent-4 max-h-48 overflow-y-scroll">
				<div class="absolute top-0" />
				{@html spell.desc}
				<div class="absolute bottom-0" />
			</div>
		</li>
	{/each}
</div>

<style>
	li {
		list-style: none;
	}
	h3 {
		font-variant: small-caps;
	}
</style>
