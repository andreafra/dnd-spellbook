// Data Structures
export enum SpellSchool {
	ABJURATION,
	CONJURATION,
	DIVINATION,
	ENCHANTMENT,
	EVOCATION,
	ILLUSION,
	NECROMANCY,
	TRANSMUTATION
}
export enum SpellClass {
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
export interface Spell {
	name: string;
	id: string;
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
	school: SpellSchool;
	class: SpellClass[];
}
