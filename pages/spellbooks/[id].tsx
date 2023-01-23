import {
	EyeIcon,
	EyeOffIcon,
	PencilIcon,
	TrashIcon,
	XIcon,
} from "@heroicons/react/outline"
import axios from "axios"
import { useRouter } from "next/router"
import { useLayoutEffect, useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Button, DangerButton, PrimaryButton } from "../../components/Button"
import { Field } from "../../components/Field"
import SpellList from "../../components/SpellList"
import config from "../../config"
import { useAppDispatch, useAppSelector } from "../../store"
import { queueMessage } from "../../store/reducers/settings"
import { load, rename, reset } from "../../store/reducers/spellbook"
import { Spellbook } from "../../types/Spellbook"

const FETCH_SPELLBOOK_QUERY = "fetchSpellbook"
const DELETE_SPELLBOOK_QUERY = "deleteSpellbook"

export default function SpellbookDetail() {
	const queryClient = useQueryClient()
	const spellbook = useAppSelector((state) => state.spellbook)
	const dispatch = useAppDispatch()
	const router = useRouter()

	const [isEdit, setIsEdit] = useState(false)
	const [overwriteLocalData, setOverwriteLocalData] = useState(false)
	const [title, setTitle] = useState(spellbook.title)
	const [showAllSpells, setShowAllSpells] = useState(false)

	const { id: spellbookId } = router.query

	const fetchSpellbook = async () => {
		const res = await axios.get(`/api/spellbooks/${spellbookId}`)
		const data = res.data as Spellbook
		return data
	}

	const updateSpellbook = async (updatedSpellbook) => {
		return axios.put(`/api/spellbooks/${spellbookId}`, updatedSpellbook)
	}

	const deleteSpellbook = async () => {
		return axios.delete(`/api/spellbooks/${spellbookId}`)
	}

	const fetchSpellbookQuery = useQuery(
		FETCH_SPELLBOOK_QUERY,
		fetchSpellbook,
		{
			onSuccess: (data) => {
				// if the open spellbook is the same, don't load remote data again
				if (spellbook.id !== data.id || overwriteLocalData) {
					setOverwriteLocalData(false)
					dispatch(load(data))
				}
			},
			onError: () => {
				dispatch(
					queueMessage({
						text: `Couldn't fetch spellbook from API with id ${spellbook.id}`,
						type: "ERROR",
					})
				)
			},
			enabled: !!spellbookId,
		}
	)

	const deleteSpellbookQuery = useQuery(
		DELETE_SPELLBOOK_QUERY,
		deleteSpellbook,
		{
			onSuccess: () => {
				// reset and redirect back to the spellbooks page
				dispatch(reset())
				router.push("/spellbooks")
			},
			onError: () => {
				dispatch(
					queueMessage({
						text: "Failed to delete spellbook!",
						type: "ERROR",
					})
				)
			},
			enabled: false,
		}
	)

	const updateSpellbookMutation = useMutation(updateSpellbook, {
		onSuccess: () => {
			dispatch(
				queueMessage({
					text: "Spellbook updated successfully!",
					type: "SUCCESS",
				})
			)
			queryClient.invalidateQueries(FETCH_SPELLBOOK_QUERY)
		},
		onError: () => {
			dispatch(
				queueMessage({
					text: "Failed to update spellbook!",
					type: "ERROR",
				})
			)
		},
	})

	const canRename = spellbook.title !== title

	const _handleRename = () => {
		dispatch(rename(title))
		dispatch(
			queueMessage({ text: "Updating spellbook...", type: "PRIMARY" })
		)
		// update title on remote
		updateSpellbookMutation.mutate({ ...spellbook, title } as Spellbook)
		setIsEdit(false)
	}

	const _uploadSpellbook = () => {
		dispatch(
			queueMessage({
				text: "Uploading spellbook...",
				type: "PRIMARY",
			})
		)
		updateSpellbookMutation.mutate({
			...spellbook,
			spellIds: spellbook.spellIds,
		} as Spellbook)
	}

	const _deleteSpellbook = () => {
		if (confirm(`Delete spellbook "${spellbook.title}"?`)) {
			dispatch(
				queueMessage({ text: "Deleting spellbook...", type: "PRIMARY" })
			)
			deleteSpellbookQuery.refetch()
		}
	}

	const shouldSync =
		fetchSpellbookQuery.isSuccess &&
		spellbook.spellIds &&
		spellbook.spellIds.toString() !==
			fetchSpellbookQuery.data.spellIds.toString()

	let timeout = useRef<ReturnType<typeof setTimeout>>()

	useLayoutEffect(() => {
		// Reset timeout
		clearTimeout(timeout.current)

		// After a moment from last input, dispatch search
		timeout.current = setTimeout(() => {
			if (shouldSync) {
				_uploadSpellbook()
			}
		}, config.autoUploadTimeoutMilliseconds)
	}, [spellbook.spellIds])

	useLayoutEffect(() => {
		return () => {
			if (shouldSync) {
				_uploadSpellbook()
			}
		}
	}, [])

	if (fetchSpellbookQuery.isLoading)
		return <p className="animate-pulse p-4 font-bold">Loading...</p>

	return (
		<>
			<section className="mt-4 mb-2 space-y-2 md:mt-6">
				{isEdit ? (
					<div className="grid grow grid-cols-2 gap-2 md:max-w-fit">
						<div className="col-span-2">
							<Field
								label="New title"
								id="title"
								type="text"
								value={title}
								onChange={(value) => setTitle(value)}
								placeholder="Spellbook title"
							/>
						</div>
						<PrimaryButton
							title="Rename"
							onClick={_handleRename}
							icon={<PencilIcon className="h-6 w-6" />}
							disabled={!canRename}
						/>
						<DangerButton
							title="Delete"
							onClick={_deleteSpellbook}
							icon={<TrashIcon className="h-6 w-6" />}
							className="col-span-1"
						/>
						<Button
							title="Cancel"
							icon={<XIcon className="h-6 w-6" />}
							className="col-span-2"
							onClick={() => setIsEdit(false)}
						/>
					</div>
				) : (
					<div className="grid grid-cols-2 gap-2 md:max-w-fit">
						<Button
							title="Edit"
							className="w-full"
							icon={<PencilIcon className="h-6 w-6" />}
							onClick={() => setIsEdit(true)}
						/>
						<Button
							title="All Spells"
							className="w-full"
							icon={
								showAllSpells ? (
									<EyeOffIcon className="h-6 w-6" />
								) : (
									<EyeIcon className="h-6 w-6" />
								)
							}
							onClick={() => setShowAllSpells(!showAllSpells)}
						/>
					</div>
				)}
				{/* <hr className="border-t-2 border-primaryLight-300" />
				<PrimaryButton
					title="Add more spells"
					icon={<PlusIcon className="h-6 w-6" />}
					onClick={() => router.push("/")}
					className="block"
				/> */}
			</section>
			<section>
				<SpellList showAllSpells={showAllSpells} />
			</section>
		</>
	)
}
