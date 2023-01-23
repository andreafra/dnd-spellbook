import { RefreshIcon } from "@heroicons/react/outline"
import { PlusIcon } from "@heroicons/react/solid"
import axios from "axios"
import { useSession } from "next-auth/react"
import { Suspense, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Button, PrimaryButton } from "../components/Button"
import { Field } from "../components/Field"
import { Layout } from "../components/Layout"
import { Spellbook, SpellbookPlaceholder } from "../components/Spellbook"
import config from "../config"
import { useAppDispatch } from "../store"
import { queueMessage } from "../store/reducers/settings"
import { Spellbook as TSpellbook } from "../types/Spellbook"

const FETCH_SPELLBOOKS_QUERY = "fetchSpellbooks"

export default function Spellbooks() {
	const { data: session } = useSession()
	const queryClient = useQueryClient()
	const dispatch = useAppDispatch()

	// Queries
	const fetchSpellbooks = async () => {
		const res = await axios.get("/api/spellbooks")
		return res.data.spellbooks as TSpellbook[]
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
					queueMessage({
						text: "Couldn't fetch user spellbooks from API.",
						type: "ERROR",
					})
				)
			},
		}
	)

	const createSpellbookMutation = useMutation(createSpellbook, {
		onSuccess: () => {
			dispatch(
				queueMessage({
					text: "Spellbook successfully created!",
					type: "SUCCESS",
				})
			)
			queryClient.invalidateQueries(FETCH_SPELLBOOKS_QUERY)
		},
		onError: () => {
			dispatch(
				queueMessage({
					text: "Failed to create a new spellbook!",
					type: "ERROR",
				})
			)
		},
	})

	const currentSpellbookQuantity = (fetchSpellbooksQuery.data ?? []).length

	const _createSpellbook = async () => {
		createSpellbookMutation.mutate({ title: "My new spellbook" })
	}

	if (!session)
		return (
			<section className="space-y-2 py-2 text-center">
				<h1 className="py-4 text-2xl font-bold">
					Sorry, you need to login to access this feature!
				</h1>
				<p>It's quick and easy and only essential data is collected.</p>
			</section>
		)

	return (
		<>
			<section className="space-y-2 py-2">
				<h2 className="text-2xl font-bold">
					Your collection{" "}
					<span
						className="ml-2 rounded-full bg-primaryLight-300 px-2 py-1 text-xl text-primaryLight-600"
						hidden={!fetchSpellbooksQuery.isSuccess}
					>
						{fetchSpellbooksQuery.isSuccess &&
							currentSpellbookQuantity}
						/{config.maxSpellbooks}
					</span>
				</h2>
				<PrimaryButton
					title="New"
					disabled={
						currentSpellbookQuantity >= config.maxSpellbooks ||
						createSpellbookMutation.isLoading ||
						fetchSpellbooksQuery.isLoading
					}
					icon={
						createSpellbookMutation.isLoading ? (
							<RefreshIcon className="inline-block h-6 w-6 animate-spin" />
						) : (
							<PlusIcon className="inline-block h-6 w-6" />
						)
					}
					onClick={_createSpellbook}
				/>
			</section>
			<section className="">
				<SpellbookList fetchSpellbooksQuery={fetchSpellbooksQuery} />
			</section>
		</>
	)
}

function SpellbookList({ fetchSpellbooksQuery }) {
	if (fetchSpellbooksQuery.isLoading)
		return (
			<ul className="py-2 text-center md:text-left">
				<SpellbookPlaceholder />
			</ul>
		)

	return (
		<ul className="py-2 text-center md:text-left">
			{fetchSpellbooksQuery.data &&
				fetchSpellbooksQuery.data.map((a) => (
					<li key={a.id} className="animate-fadeIn">
						<Spellbook
							title={a.title}
							size={a.spellIds.length}
							id={a.id}
						/>
					</li>
				))}
		</ul>
	)
}
