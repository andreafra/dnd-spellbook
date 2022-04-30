import { Spellbook as DbSpellbook } from "@prisma/client"
import { ISpellbook } from "../types/Spellbook"

/**
 * This should be run on the backend.
 * @param spellbook A spellbook object from the Database
 * @returns A spellbook object to be passed to the client
 */
export function parseSpellbook(spellbook: DbSpellbook): ISpellbook {
	return {
		id: spellbook.id,
		last_updated: new Date(spellbook.lastUpdated).toISOString(),
		title: spellbook.title,
		spellIds: spellbook.spellIds,
	}
}
