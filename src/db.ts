// db.ts
import type { ISpell } from './types';

function setSpells(spells: ISpell[]) {
	localStorage.setItem('spells', JSON.stringify(spells));
}

function getSpells() {
	return JSON.parse(localStorage.getItem('spells')) as ISpell[];
}

function isInitialized() {
	return !!localStorage.getItem('spells');
}

localStorage.getItem('spells');

export const db = {
	getSpells: getSpells,
	setSpells: setSpells,
	isInitialized: isInitialized
};
