import { PlusIcon } from "@heroicons/react/solid"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Button } from "../components/Button"
import { Field } from "../components/Field"
import { Layout } from "../components/Layout"
import { Spellbook } from "../components/Spellbook"
import config from "../config"
import { useAppDispatch } from "../store"
import { setErrorMessage } from "../store/reducers/settings"
import { load } from "../store/reducers/spellbook"

const FETCH_SPELLBOOKS_QUERY = "fetchSpellbooks"

export default function Spellbooks() {
	const queryClient = useQueryClient()

	const [title, setTitle] = useState("")

	const dispatch = useAppDispatch()

	// Queries
	const fetchSpellbooks = async () => {
		const res = await axios.get("/api/spellbooks")

		return res.data.spellbooks
	}

	const createSpellbook = async (newSpellbook) => {
		return axios.post("/api/spellbooks/create", newSpellbook)
	}

	const fetchSpellbooksQuery = useQuery(
		FETCH_SPELLBOOKS_QUERY,
		fetchSpellbooks,
		{
			onError: () => {
				dispatch(
					setErrorMessage("Couldn't fetch user spellbooks from API.")
				)
			},
		}
	)

	const createSpellbookMutation = useMutation(createSpellbook, {
		onSuccess: () => {
			queryClient.invalidateQueries(FETCH_SPELLBOOKS_QUERY)
		},
	})

	const currentSpellbookQuantity = (fetchSpellbooksQuery.data ?? []).length

	const _createSpellbook = async () => {
		if (title === "") return

		createSpellbookMutation.mutate({ title })
	}

	return (
		<Layout>
			<section
				className="space-y-2 px-2"
				id="create-spellbook"
				hidden={
					fetchSpellbooksQuery.isLoading ||
					currentSpellbookQuantity >= config.maxSpellbooks
				}
			>
				<h2 className="py-2 text-2xl font-bold">
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
					onChange={(value) => setTitle(value)}
					placeholder="Spellbook title"
				/>
				<Button
					title="New Spellbook"
					onClick={_createSpellbook}
					disabled={title.length === 0}
					icon={<PlusIcon className="h-6 w-6 align-middle" />}
				/>
				{createSpellbookMutation.isError && (
					<p className="font-bold text-red-600">
						Couldn't create new spellbook!
					</p>
				)}
				{createSpellbookMutation.isSuccess && (
					<p className="font-bold text-green-500">
						New spellbook created!
					</p>
				)}
			</section>
			<section className="px-2">
				<h2 className="py-2 text-2xl font-bold">
					Your spellbook collection
					<span
						className="ml-2 rounded-full bg-primaryLight-300 px-2 py-1 text-xl text-primaryLight-600"
						hidden={!fetchSpellbooksQuery.isSuccess}
					>
						{fetchSpellbooksQuery.isSuccess &&
							currentSpellbookQuantity}
						/{config.maxSpellbooks}
					</span>
				</h2>
				<p className="py-2">
					Click on a spellbook to make it active, then you'll be able
					to edit its contents.
				</p>
				{fetchSpellbooksQuery.isError && (
					<p className="font-bold text-red-600">
						An error has occurred while loading spellbooks!
					</p>
				)}
				{fetchSpellbooksQuery.isLoading && "Loading..."}

				<div className="py-2 text-center md:text-left">
					{fetchSpellbooksQuery.data &&
						fetchSpellbooksQuery.data.map((a) => (
							<Spellbook
								title={a.title}
								size={a.spellIds.length}
								key={a.id}
								id={a.id}
							/>
						))}
				</div>
			</section>
		</Layout>
	)
}
