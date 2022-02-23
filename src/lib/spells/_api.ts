import { ISpellClass, ISpellSchool, type ISpell } from '$src/types';

const DATA_URL = '/spells.json';

export async function fetchSpellData(): Promise<ISpell[]> {
	let res = await fetch(DATA_URL, {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	});

	let data = await res.json();
	return data.spells.map((v) => parseSpell(v));
}

export function parseSpell(spell: any): ISpell {
	let newSpell: ISpell = {
		_id: getId(spell.name),
		name: spell.name,
		desc: spell.desc,
		range: spell.range,
		components: spell.components,
		materials: spell.material
			? spell.material.toLowerCase().slice(0, spell.material.length - 1)
			: '',
		ritual: spell.ritual === 'yes',
		concentration: spell.concentration === 'yes',
		duration: spell.duration,
		castingTime: spell.casting_time,
		level: getLevel(spell.level),
		school: getSchool(spell.school),
		class: getClass(spell.class)
	};

	return newSpell;
}

function getId(str: string): string {
	return str.replace(/ +/g, '_').replace("'", '').toLowerCase();
}

function getLevel(str: string): number {
	return str === 'Cantrip' ? 0 : Number(str.charAt(0));
}

function getSchool(str: string): ISpellSchool {
	return ISpellSchool[str.toUpperCase()] as ISpellSchool;
}

function getClass(str: string): ISpellClass[] {
	let tokens = str.toUpperCase().split(/, +/g);
	return tokens.map((t) => ISpellClass[t.replace(' ', '_')] as ISpellClass);
}

export function getSchoolName(school: ISpellSchool): string {
	return ISpellSchool[school].toLowerCase();
}

const SPELL_SUFFIXES = ['st', 'nd', 'rd'];

export function getLevelSuffix(level: number): string {
	return level < 4 ? SPELL_SUFFIXES[level - 1] : 'th';
}

export function capitalize(str: string): string {
	str = str.replace('_', ' ');
	let newStr = str.charAt(0).toUpperCase();
	newStr += str.slice(1).toLowerCase();
	return newStr;
}
