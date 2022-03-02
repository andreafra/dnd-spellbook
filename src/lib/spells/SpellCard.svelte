<script script lang="ts">
	import type { ISpell } from '$src/types';
	import { each } from 'svelte/internal';

	import { getLevelSuffix, getSchoolName } from './_api';

	import Icon from 'heroicons-for-svelte';
	import { PlusCircle } from 'heroicons-for-svelte/icons/outline';

	export let spell: ISpell;

	let descDiv;
	let isStartScroll = true;
	let isEndScroll = false;

	$: isEndScroll = descDiv && descDiv.scrollTopMax === 0;

	function _handleScroll(e) {
		isStartScroll = e.target.scrollTop === 0;
		isEndScroll = e.target.scrollTop === e.target.scrollTopMax;
	}
</script>

<li class="text-base">
	<h3 class="font-bold text-lg">
		{spell.name}
	</h3>
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
		<div class="max-h-48 overflow-y-auto" on:scroll={_handleScroll} bind:this={descDiv}>
			{@html spell.desc}
		</div>
		<div
			class="absolute bottom-0 bg-gradient-to-t from-red-100 h-10 w-full pointer-events-none"
			class:hidden={isEndScroll}
		/>
	</div>
	<ul>
		{#each spell.class as cls}
			<li>{cls}</li>
		{/each}
	</ul>
	<div>
		<button />
	</div>
</li>

<style>
	li {
		list-style: none;
	}
	h3 {
		font-variant: small-caps;
	}
</style>
