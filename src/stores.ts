import { derived, writable, type Writable } from 'svelte/store';
import type { Spell } from './types';

export const query = writable('');
export const spells: Writable<Spell[]> = writable([]);
export const filteredSpells = derived([query, spells], ([$query, $spells]) =>
	$spells.filter((x) => x.name.toLowerCase().startsWith($query.toLowerCase()))
);
