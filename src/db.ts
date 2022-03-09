// db.ts
import type { ISpell } from './types';

function setSpells(spells: ISpell[]) {
	localStorage.setItem('spells', JSON.stringify(spells));
}

function getSpells() {
	try {
		return JSON.parse(localStorage.getItem('spells')) as ISpell[];
	} catch {
		console.error('DB: Failed to fetch spells from local storage');
		return [];
	}
}

function isInitialized() {
	return !!localStorage.getItem('spells');
}

function setPreparedSpells(spells) {
	localStorage.setItem('prepared_spells', JSON.stringify(spells));
}

function getPreparedSpells() {
	try {
		return JSON.parse(localStorage.getItem('prepared_spells'));
	} catch {
		console.error('DB: Failed to fetch prepared spells from local storage');
		return {};
	}
}

export const db = {
	getSpells: getSpells,
	setSpells: setSpells,
	isInitialized: isInitialized,
	setPreparedSpells: setPreparedSpells,
	getPreparedSpells: getPreparedSpells
};
