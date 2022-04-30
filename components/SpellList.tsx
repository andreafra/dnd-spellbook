import { useAppSelector } from "../store"
import { filter } from "../store/reducers/spells"
import { ISpell } from "../types/Spell"
import SpellCard from "./SpellCard"

interface ISpellListProps {
	defaultSpells?: ISpell[]
}

export function SpellList({ defaultSpells }: ISpellListProps) {
	// Spells
	const spells = defaultSpells || useAppSelector((state) => state.spells)
	const spellIds = useAppSelector((state) => state.spellbook.spellIds) ?? []

	// Filters
	const filterQuery = useAppSelector((state) => state.settings.filterQuery)
	const filteredResults = filter.search(filterQuery).map((a) => a.item)

	return (
		<>
			{(!!filterQuery ? filteredResults : spells).map((spell) => (
				<SpellCard
					spell={spell}
					key={spell.id}
					selected={spellIds.indexOf(spell.id) > -1}
				/>
			))}
		</>
	)
}
