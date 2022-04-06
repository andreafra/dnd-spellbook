export function getId(str) {
  return str.replace(/ +/g, "_").replace("'", "").toLowerCase()
}

export function getLevel(str) {
  return str === "Cantrip" ? 0 : Number(str.charAt(0))
}

export function getSchool(str) {
  return str.toUpperCase()
}

export function getClass(str) {
  let tokens = str.toUpperCase().split(/, +/g)
  return tokens.map((t) => t.replace(" ", "_").toUpperCase())
}

export function getSchoolName(school) {
  return school.toString().toLowerCase()
}

const SPELL_SUFFIXES = ["st", "nd", "rd"]

export function getLevelSuffix(level) {
  return level < 4 ? SPELL_SUFFIXES[level - 1] : "th"
}

export function capitalize(str) {
  str = str.replace("_", " ")
  let newStr = str.charAt(0).toUpperCase()
  newStr += str.slice(1).toLowerCase()
  return newStr
}
