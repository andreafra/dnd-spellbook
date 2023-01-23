import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { disableFilters, enableFilters } from "../store/reducers/settings"
import SpellCard, { SpellCardPlaceholder } from "./SpellCard"

export default function SpellList({
	showAllSpells = true,
}: {
	showAllSpells?: boolean
}) {
	const spells = useAppSelector((state) => state.spellStore.spells)
	const filters = useAppSelector((state) => state.spellStore.filters)
	const spellIds = useAppSelector((state) => state.spellbook.spellIds) ?? []
	const dispatch = useAppDispatch()

	const spellList = useMemo(
		() =>
			(showAllSpells
				? spells
				: spells.filter((spell) => spellIds.indexOf(spell.id) > -1)
			).filter(
				(spell) =>
					(filters.name === "" ||
						spell.name
							.toLowerCase()
							.includes(filters.name.toLowerCase())) &&
					(filters.school === "ANY" ||
						spell.school === filters.school) &&
					(filters.class === "ANY" ||
						spell.class.includes(filters.class)) &&
					(filters.level < 0 || spell.level == filters.level)
			),
		[filters, spells, showAllSpells]
	)

	useEffect(() => {
		dispatch(enableFilters())
		return () => {
			dispatch(disableFilters())
		}
	}, [])

	if (!spells)
		return (
			<div className="grid list-none grid-cols-1 gap-2 py-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4 md:py-4 xl:grid-cols-4">
				<SpellCardPlaceholder />
				<SpellCardPlaceholder />
				<SpellCardPlaceholder />
			</div>
		)

	return (
		<div className="grid list-none grid-cols-1 gap-2 py-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4 md:py-4 xl:grid-cols-4">
			{spellList.map((spell) => (
				<SpellCard
					spell={spell}
					key={spell.id}
					selected={spellIds.indexOf(spell.id) > -1}
				/>
			))}
		</div>
	)
}
