import { SpellClass, SpellSchool, type Spell } from '$src/types';

const DATA_URL = '/spells.json';

export async function fetchSpellData(): Promise<Spell[]> {
	let res = await fetch(DATA_URL, {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	});

	let data = await res.json();
	return data.spells.map((v) => parseSpell(v));
}

export function parseSpell(spell: any): Spell {
	let newSpell: Spell = {
		name: spell.name,
		id: getId(spell.name),
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

function getSchool(str: string): SpellSchool {
	return SpellSchool[str.toUpperCase()] as SpellSchool;
}

function getClass(str: string): SpellClass[] {
	let tokens = str.toUpperCase().split(/, +/g);
	return tokens.map((t) => SpellClass[t.replace(' ', '_')] as SpellClass);
}

export function getSchoolName(school: SpellSchool): string {
	return SpellSchool[school].toLowerCase();
}

const SPELL_SUFFIXES = ['st', 'nd', 'rd'];

export function getLevelSuffix(level: number): string {
	return level < 4 ? SPELL_SUFFIXES[level - 1] : 'th';
}
