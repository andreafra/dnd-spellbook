// Data Structures

const _SpellSchools = {
	ABJURATION: '',
	CONJURATION: '',
	DIVINATION: '',
	ENCHANTMENT: '',
	EVOCATION: '',
	ILLUSION: '',
	NECROMANCY: '',
	TRANSMUTATION: ''
};

const _SpellClasses = {
	BARD: '',
	CLERIC: '',
	DRUID: '',
	PALADIN: '',
	RANGER: '',
	RITUAL_CASTER: '',
	SORCERER: '',
	WARLOCK: '',
	WIZARD: ''
};

export const SpellSchools = Object.keys(_SpellSchools);
export const SpellClasses = Object.keys(_SpellClasses);

export type ISpellSchool = keyof typeof _SpellSchools;
export type ISpellClass = keyof typeof _SpellClasses;
export interface ISpell {
	_id: string;
	name: string;
	desc: string;
	page?: string;
	range: string;
	components: string;
	materials: string;
	ritual: boolean;
	concentration: boolean;
	duration: string;
	castingTime: string;
	level: number;
	school: ISpellSchool;
	class: ISpellClass[];
}

export type SortMethod = 'NAME' | 'LEVEL';
export type SortDirection = 'ASC' | 'DESC';
