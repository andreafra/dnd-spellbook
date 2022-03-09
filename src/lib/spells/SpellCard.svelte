<script script lang="ts">
	import type { ISpell } from '$src/types';
	import { each } from 'svelte/internal';

	import { capitalize, getLevelSuffix, getSchoolName } from './_api';

	import Icon from 'heroicons-for-svelte';
	import { PlusCircle, MinusCircle } from 'heroicons-for-svelte/icons/outline';
	import { preparedSpellIds } from '$src/stores';

	export let spell: ISpell;

	let descDiv;
	let isStartScroll = true;
	let isEndScroll = false;

	$: isEndScroll = descDiv && descDiv.scrollTopMax === 0;

	let isSpellPrepared = $preparedSpellIds.hasOwnProperty(spell._id);

	function _handleScroll(e) {
		isStartScroll = e.target.scrollTop === 0;
		isEndScroll = e.target.scrollTop === e.target.scrollTopMax;
	}

	function _addToPreparedSpells() {
		if ($preparedSpellIds.hasOwnProperty(spell._id)) {
			// remove key
			delete $preparedSpellIds[spell._id];
			isSpellPrepared = false;
		} else {
			$preparedSpellIds[spell._id] = 1;
			isSpellPrepared = true;
		}
	}
</script>

<li
	class="relative text-base p-4 m-2 rounded-lg hover:shadow-red-300 hover:shadow-md transition-shadow"
>
	<div class="flex justify-between">
		<h3 class="font-bold text-lg self-center">
			{spell.name}
		</h3>
		<button
			class="bg-red-300 rounded-full h-10 w-10 flex justify-center top-0 right-0 self-center"
			on:click={() => _addToPreparedSpells()}
		>
			<span class="text-2xl self-center text-red-900">
				{#if isSpellPrepared}
					<Icon icon={MinusCircle} />
				{:else}
					<Icon icon={PlusCircle} />
				{/if}
			</span>
		</button>
	</div>
	<p>
		<i class="capitalize">
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
	<div class="relative indent-4 ">
		<div
			class="absolute top-0 bg-gradient-to-b from-red-100 h-10 w-full pointer-events-none"
			class:hidden={isStartScroll}
		/>
		<div
			class="max-h-48 overflow-y-auto text-gray-800"
			on:scroll={_handleScroll}
			bind:this={descDiv}
		>
			{@html spell.desc}
		</div>
		<div
			class="absolute bottom-0 bg-gradient-to-t from-red-100 h-10 w-full pointer-events-none"
			class:hidden={isEndScroll}
		/>
	</div>
	<ul class="space-x-1 py-2 overflow-x-auto">
		{#each spell.class as cls}
			<li class="inline-block text-red-900 bg-red-300 rounded-full px-2 py-0.5">
				{capitalize(cls)}
			</li>
		{/each}
	</ul>
</li>

<style>
	li {
		list-style: none;
	}
	h3 {
		font-variant: small-caps;
	}
</style>
