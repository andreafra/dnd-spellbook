import { RefreshIcon } from "@heroicons/react/outline"
import { PlusIcon } from "@heroicons/react/solid"
import axios from "axios"
import { useSession } from "next-auth/react"
import { Suspense, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Button, PrimaryButton } from "../components/Button"
import { Field } from "../components/Field"
import { Layout } from "../components/Layout"
import { Spellbook } from "../components/Spellbook"
import config from "../config"
import { useAppDispatch } from "../store"
import { setErrorMessage } from "../store/reducers/settings"
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
					disabled={currentSpellbookQuantity >= config.maxSpellbooks}
					icon={
						<PlusIcon className="inline-block h-6 w-6 align-middle" />
					}
					onClick={_createSpellbook}
				/>
			</section>
			{/* DISPLAY THESE IN A TOAST 
				{createSpellbookMutation.isLoading && (
					<p className="font-bold">
						<RefreshIcon className="mr-2 inline-block h-6 w-6 animate-spin" />
						Creating your spellbook...
					</p>
				)}
				{createSpellbookMutation.isError && (
					<p className="font-bold text-red-500">
						Couldn't create new spellbook!
					</p>
				)}
				{createSpellbookMutation.isSuccess && (
					<p className="font-bold text-green-500">
						New spellbook created!
					</p>
				)}
			</section> */}
			<section className="">
				<SpellbookList fetchSpellbooksQuery={fetchSpellbooksQuery} />
			</section>
		</>
	)
}

function SpellbookList({ fetchSpellbooksQuery }) {
	return (
		<ul className="py-2 text-center md:text-left">
			{fetchSpellbooksQuery.data &&
				fetchSpellbooksQuery.data.map((a) => (
					<li>
						<Spellbook
							title={a.title}
							size={a.spellIds.length}
							key={a.id}
							id={a.id}
						/>
					</li>
				))}
			{fetchSpellbooksQuery.isError && (
				<p className="font-bold text-red-500">
					An error has occurred while loading spellbooks!
				</p>
			)}
			{fetchSpellbooksQuery.isLoading && "Loading..."}
		</ul>
	)
}
