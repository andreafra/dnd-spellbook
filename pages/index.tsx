import SpellCard from "../components/SpellCard"
import { useAppSelector } from "../store"

export default function Home() {
	const spells = useAppSelector((state) => state.spells)
	const spellIds = useAppSelector((state) => state.spellbook.spellIds) ?? []

	return (
		<section className="grid list-none grid-cols-1 pt-2 sm:grid-cols-2 md:grid-cols-3">
			{spells &&
				spells.map((spell) => (
					<SpellCard
						spell={spell}
						key={spell.id}
						selected={spellIds.indexOf(spell.id) > -1}
					/>
				))}
		</section>
	)
}
