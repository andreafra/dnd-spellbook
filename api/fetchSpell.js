import { getId, getLevel, getSchool, getClass } from "./parseSpell"

const DATA_URL = "/spells.json"

export async function fetchSpells() {
  let res = await fetch(DATA_URL, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })

  let data = await res.json()
  return data.spells.map((v) => parseSpell(v))
}

export function parseSpell(spell) {
  let newSpell = {
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
