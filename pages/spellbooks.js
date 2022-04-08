import Head from "next/head"
import { useState } from "react"
import Header from "../components/Header"
import { Plus } from "../components/Icons"
import { useEffect } from "react"
import { Field } from "../components/Field"
import { Button } from "../components/Button"
import { Spellbook } from "../components/Spellbook"
import { useContext } from "react"
import { Dispatchers } from "../stores/Dispatcher"
import { Layout } from "../components/Layout"

export default function Spellbooks({ spells, spellbook, settings }) {
	const [title, setTitle] = useState("")
	const [successMsg, setSuccessMsg] = useState("")
	const [errorMsg, setErrorMsg] = useState("")
	const [spellbooks, setSpellbooks] = useState([])

	const { spellbookDispatch } = useContext(Dispatchers)

	const _createSpellbook = async () => {
		if (title === "") return

		const spellbookData = {
			title: title,
		}

		const res = await fetch("/api/spellbooks/create", {
			method: "POST",
			headers: [["Content-Type", "application/json"]],
			body: JSON.stringify(spellbookData),
		})

		console.log(res)
		if (res.status === 200) {
			setSuccessMsg("Spellbook successfully created!")
			setErrorMsg("")
		} else {
			setErrorMsg("Failed to contact API")
		}
	}

	// Validate input
	useEffect(() => {
		if (title === "") setErrorMsg("Add a title for the spellbook!")
		else setErrorMsg("")
	}, [title])

	const fetchSpellbookData = async () => {
		const res = await fetch("/api/spellbooks", {
			method: "GET",
		})
		const json = await res.json()
		setSpellbooks(json.spellbooks ?? [])
	}

	return (
		<Layout>
			<section className="px-2 space-y-2">
				<h2 className="font-bold text-2xl py-2">
					Create a new spellbook
				</h2>
				<p>
					Pick a name for your new spellbook, and then you'll add
					spells to it.
				</p>
				<Field
					label="Title"
					id="title"
					type="text"
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Spellbook title"
				/>
				<Button
					title="New Spellbook"
					onClick={_createSpellbook}
					icon={Plus}
				/>
				<p hidden={errorMsg.length < 1} className="text-red-500">
					{errorMsg}
				</p>
				<p hidden={successMsg.length < 1} className="text-green-500">
					{successMsg}
				</p>
			</section>
			<section className="px-2 mt-8">
				<h2 className="font-bold text-2xl py-2">
					Your spellbook collection
				</h2>
				<Button
					title="Fetch data"
					onClick={() => fetchSpellbookData()}
				/>
				<div className="py-2 text-center md:text-left">
					{spellbooks.map((a) => (
						<Spellbook
							title={a.title}
							size={a.spells.length}
							key={a.id}
							id={a.id}
							onClick={() =>
								spellbookDispatch({
									type: "init",
									payload: a,
								})
							}
						/>
					))}
				</div>
			</section>
		</Layout>
	)
}
