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
import { useMutation, useQuery, useQueryClient } from "react-query"

const FETCH_SPELLBOOKS_QUERY = "fetchSpellbooks"

export default function Spellbooks({ spells, spellbook, settings }) {
	const queryClient = useQueryClient()

	const [title, setTitle] = useState("")
	const [errorMsg, setErrorMsg] = useState("")
	// const [spellbooks, setSpellbooks] = useState([])

	const { spellbookDispatch } = useContext(Dispatchers)

	const createSpellbook = (newSpellbook) =>  fetch("/api/spellbooks/create", {
			method: "POST",
			headers: [["Content-Type", "application/json"]],
			body: JSON.stringify(newSpellbook),
		})


	const fetchSpellbooks = async () => {
		const res = await fetch("/api/spellbooks", {
			method: "GET",
		})
		const json = await res.json()
		return json.spellbooks
	}

	const fetchSpellbooksQuery = useQuery(
		FETCH_SPELLBOOKS_QUERY,
		fetchSpellbooks
	)

	const createSpellbookMutation = useMutation(createSpellbook, {
		onSuccess: () => {
			queryClient.invalidateQueries(FETCH_SPELLBOOKS_QUERY)
		},
	})

	const _createSpellbook = async () => {
		if (title === "") return

		const spellbookData = {
			title: title,
		}

		createSpellbookMutation.mutateAsync(spellbookData)
	}

	// Validate input
	useEffect(() => {
		setErrorMsg(title === "" ? "Add a title for the spellbook!" : "")
	}, [title])

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
				<p
					hidden={createSpellbookMutation.isError || errorMsg}
					className="text-red-500"
				>
					{createSpellbookMutation.error}
					{errorMsg}
				</p>
				<p
					hidden={!createSpellbookMutation.isSuccess}
					className="text-green-500"
				>
					New spellbook created!
				</p>
			</section>
			<section className="px-2 mt-8">
				<h2 className="font-bold text-2xl py-2">
					Your spellbook collection
				</h2>
				{fetchSpellbooksQuery.isError ? (
					<p>An error has occurred loading spellbooks!</p>
				) : null}
				{fetchSpellbooksQuery.isLoading ? "Loading..." : null}

				<div className="py-2 text-center md:text-left">
					{fetchSpellbooksQuery.data &&
						fetchSpellbooksQuery.data.map((a) => (
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
