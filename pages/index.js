import Head from "next/head"
import Header from "../components/Header"
import { Layout } from "../components/Layout"
import SpellCard from "../components/SpellCard"

export default function Home({ spells, spellbook, settings }) {
	return (
		<Layout>
			<section className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 list-none">
				{spells
					? spells.map((spell) => (
							<SpellCard
								spell={spell}
								key={spell.id}
								selected={
									spellbook.spells.indexOf(spell.id) > -1
								}
							/>
					  ))
					: null}
			</section>
		</Layout>
	)
}
