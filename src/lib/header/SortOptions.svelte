<script lang="ts">
	import { spellSortDirection } from '$src/stores';

	import Icon from 'heroicons-for-svelte';
	import { SortAscending, SortDescending } from 'heroicons-for-svelte/icons/outline';

	let sortMethod = 'name';
</script>

<button
	on:click={() => {
		$spellSortDirection = $spellSortDirection === 'ASC' ? 'DESC' : 'ASC';
	}}
	class="px-4 py-2 rounded-full bg-red-300 text-red-900 text-base h-10 rounded-r-none"
>
	<Icon icon={$spellSortDirection === 'ASC' ? SortAscending : SortDescending} />
</button>
<select
	bind:value={sortMethod}
	class="px-4 py-2 rounded-full bg-red-300 text-red-900 text-base h-10 rounded-l-none cursor-pointer"
>
	<option value="name">by Name</option>
	<option value="level">by Level</option>
</select>
