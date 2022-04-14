import { PencilIcon } from "@heroicons/react/outline"
import axios from "axios"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Button } from "../../components/Button"
import { Field } from "../../components/Field"
import Header from "../../components/Header"
import { Layout } from "../../components/Layout"
import SpellCard from "../../components/SpellCard"
import { useAppDispatch, useAppSelector } from "../../store"
import { setErrorMessage } from "../../store/reducers/settings"
import { load, rename } from "../../store/reducers/spellbook"
import { Spellbook } from "../../types/Spellbook"

const FETCH_SPELLBOOK_QUERY = "fetchSpellbook"

export default function SpellbookDetail() {
	const queryClient = useQueryClient()

	const spells = useAppSelector((state) => state.spells)
	const spellbook = useAppSelector((state) => state.spellbook)
	const dispatch = useAppDispatch()

	const [isEdit, setIsEdit] = useState(false)

	const [title, setTitle] = useState(spellbook.title)

	const router = useRouter()
	const { id: spellbookId } = router.query

	const fetchSpellbook = async () => {
		const res = await axios.get(`/api/spellbooks/${spellbookId}`)
		const data = res.data as Spellbook
		return data
	}

	const updateSpellbook = async (updatedSpellbook) => {
		return axios.put(`/api/spellbooks/${spellbookId}`, updatedSpellbook)
	}

	const fetchSpellbookQuery = useQuery(
		FETCH_SPELLBOOK_QUERY,
		fetchSpellbook,
		{
			onSuccess: (data) => {
				dispatch(load(data))
			},
			onError: () => {
				dispatch(
					setErrorMessage(
						`Couldn't fetch spellbook from API with id ${spellbook.id}`
					)
				)
			},
			enabled: !!spellbookId,
		}
	)

	const updateSpellbookMutation = useMutation(updateSpellbook, {
		onSuccess: () => {
			queryClient.invalidateQueries(FETCH_SPELLBOOK_QUERY)
		},
	})

	const canRename = spellbook.title !== title

	const _handleRename = () => {
		dispatch(rename(title))
		setIsEdit(false)
	}

	return (
		<Layout>
			<section className="space-y-2 px-2">
				{isEdit ? (
					<>
						<Field
							label="New title"
							id="title"
							type="text"
							value={title}
							onChange={(value) => setTitle(value)}
							placeholder="Spellbook title"
						/>
						<Button
							title="Rename"
							onClick={_handleRename}
							icon={<PencilIcon className="h-6 w-6" />}
							disabled={!canRename}
						/>
						<Button
							title="Cancel"
							onClick={() => setIsEdit(false)}
						/>
					</>
				) : (
					<>
						<h2 className="inline-block py-2 text-2xl font-bold">
							{spellbook.title}
						</h2>
						<a
							onClick={() => setIsEdit(true)}
							className="ml-3 inline-block cursor-pointer text-lg underline"
						>
							Edit
						</a>
					</>
				)}
				{updateSpellbookMutation.isError ? (
					<p className="text-red-500">
						Couldn't update the spellbook!
					</p>
				) : null}
				{updateSpellbookMutation.isSuccess ? (
					<p className="text-green-500">
						Successfully updated the spellbook.
					</p>
				) : null}
			</section>
			<section className="grid list-none grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
				{spells &&
					spellbook.spellIds &&
					spells
						.filter((a) => spellbook.spellIds.indexOf(a.id) >= 0)
						.map((spell) => (
							<SpellCard
								spell={spell}
								key={spell.id}
								selected={
									spellbook.spellIds.indexOf(spell.id) > -1
								}
							/>
						))}
			</section>
		</Layout>
	)
}
