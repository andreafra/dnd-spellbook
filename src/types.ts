// Data Structures
export enum ISpellSchool {
	ABJURATION,
	CONJURATION,
	DIVINATION,
	ENCHANTMENT,
	EVOCATION,
	ILLUSION,
	NECROMANCY,
	TRANSMUTATION
}
export enum ISpellClass {
	BARD,
	CLERIC,
	DRUID,
	PALADIN,
	RANGER,
	RITUAL_CASTER,
	SORCERER,
	WARLOCK,
	WIZARD
}
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
