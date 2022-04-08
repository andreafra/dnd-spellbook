import Head from "next/head"
import { useRouter } from "next/router"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { Button } from "../../components/Button"
import { Field } from "../../components/Field"
import Header from "../../components/Header"
import { Edit } from "../../components/Icons"
import SpellCard from "../../components/SpellCard"
import { Dispatchers } from "../../stores/Dispatcher"

export default function SpellbookDetail({ spells, spellbook, settings }) {
	const [successMsg, setSuccessMsg] = useState("")
	const [errorMsg, setErrorMsg] = useState("")

    const { spellbookDispatch } = useContext(Dispatchers)

    const router = useRouter()
    const { id } = router.query

	useEffect(() => {
		if (spellbook.id !== id) {
			// TODO: fetch spellbook with id
		}
	}, [])

	return (
		<div className="container mx-auto">
			<Head>
				<title>D&D Spellbook | Prepared Spells</title>
				<meta
					name="description"
					content="A Dungeons and Dragons spellbook to manage your spells"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header showFilters={true} />

			<main className="pt-2">
				<section className="px-2 space-y-2">
					<h2 className="font-bold text-2xl py-2" suppressHydrationWarning>
						{spellbook.title}
					</h2>
					<Field
						label="New title"
						id="title"
						type="text"
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Spellbook title"
					/>
					<Button
						title="Rename"
						onClick={() => {}}
						icon={Edit}
					/>
					<p hidden={errorMsg.length < 1} className="text-red-500">
						{errorMsg}
					</p>
					<p hidden={successMsg.length < 1} className="text-green-500">
						{successMsg}
					</p>
				</section>
				<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 list-none">
					{spells
						? spells
								.filter(
									(a) => spellbook.spells.indexOf(a.id) >= 0
								)
								.map((spell) => (
									<SpellCard
										spell={spell}
										key={spell.id}
										selected={
											spellbook.spells.indexOf(spell.id) >
											-1
										}
									/>
								))
						: null}
				</section>
			</main>
		</div>
	)
}


