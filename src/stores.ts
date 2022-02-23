import { writable, type Writable } from 'svelte/store';
import type { ISpell, ISpellClass, ISpellSchool } from './types';

export const queryName: Writable<string> = writable('');
export const queryLevel: Writable<number> = writable(-1);
export const queryClass: Writable<ISpellClass | null> = writable(null);
export const querySchool: Writable<ISpellSchool | null> = writable(null);
export const spells: Writable<ISpell[]> = writable([]);
