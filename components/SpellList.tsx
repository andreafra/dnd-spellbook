import { useLayoutEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { disableFilters, enableFilters } from "../store/reducers/settings"
import SpellCard from "./SpellCard"

export default function SpellList() {
	const spells = useAppSelector((state) => state.spells)
	const spellIds = useAppSelector((state) => state.spellbook.spellIds) ?? []
	const dispatch = useAppDispatch()

	useLayoutEffect(() => {
		dispatch(enableFilters())
		return () => {
			dispatch(disableFilters())
		}
	}, [])

	return (
		<div className="grid list-none grid-cols-1 gap-2 py-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4 md:py-4 lg:grid-cols-4">
			{spells &&
				spells.map((spell) => (
					<SpellCard
						spell={spell}
						key={spell.id}
						selected={spellIds.indexOf(spell.id) > -1}
					/>
				))}
		</div>
	)
}
