/**
 * `last_updated` should be a string.
 * `spellIds` should be an array of strings.
 */
export interface ISpellbook {
	id: string
	title: string
	last_updated: string
	spellIds: string[]
}
