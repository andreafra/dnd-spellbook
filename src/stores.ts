import { writable, type Writable } from 'svelte/store';
import { db } from './db';
import type { ISpell, ISpellClass, ISpellSchool, SortDirection, SortMethod } from './types';

export const queryName: Writable<string> = writable('');
export const queryLevel: Writable<number> = writable(-1);
export const queryClass: Writable<ISpellClass | null> = writable(null);
export const querySchool: Writable<ISpellSchool | null> = writable(null);
export const spells: Writable<ISpell[]> = writable([]);
export const spellSortFn: Writable<(a: ISpell, b: ISpell) => number> = writable();
export const spellSortMethod: Writable<SortMethod> = writable('NAME');
export const spellSortDirection: Writable<SortDirection> = writable('ASC');

export const preparedSpellIds: Writable<{}> = writable(db.getPreparedSpells());

preparedSpellIds.subscribe((value) => {
	db.setPreparedSpells(value);
	console.log(value);
});
