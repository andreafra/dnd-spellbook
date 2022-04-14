import axios from "axios"
import { Spell } from "../types/Spell"
import { getId, getLevel, getSchool, getClass } from "./parseSpell"

const DATA_URL = "/spells.json"

export async function fetchSpells() {
	let res = await axios.get(DATA_URL)

	return res.data.spells.map((v) => parseSpell(v))
}

/**
 * "After all, why should `spell` be not exactly what I expect?"
 * @param spell A raw JS object to parse
 * @returns A safe Spell object to use
 */
export function parseSpell(spell): Spell {
	let newSpell: Spell = {
		visible: true,
		id: getId(spell.name),
		name: spell.name,
		desc: spell.desc,
		range: spell.range,
		components: spell.components,
		materials: spell.material
			? spell.material.toLowerCase().slice(0, spell.material.length - 1)
			: "",
		ritual: spell.ritual === "yes",
		concentration: spell.concentration === "yes",
		duration: spell.duration,
		castingTime: spell.casting_time,
		level: getLevel(spell.level),
		school: getSchool(spell.school),
		class: getClass(spell.class),
	}

	return newSpell
}
