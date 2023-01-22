import {
	BookmarkAltIcon,
	DownloadIcon,
	LoginIcon,
	LogoutIcon,
	TrashIcon,
} from "@heroicons/react/outline"
import axios from "axios"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useQuery } from "react-query"
import { Button, DangerButton, PrimaryButton } from "../components/Button"
import { useAppDispatch } from "../store"
import { setErrorMessage } from "../store/reducers/settings"

export default function Login() {
	const { data: session } = useSession()

	if (session) return <UserIsLoggedIn session={session} />

	return <UserIsNotLoggedIn />
}

function UserIsNotLoggedIn() {
	return (
		<section className="mx-2 space-y-4 pt-4">
			<h1 className="text-3xl font-bold">Login</h1>

			<p>
				To save and sync your spellbooks across devices, please login:
			</p>
			<PrimaryButton
				title="Log In"
				icon={<LoginIcon className="h-6 w-6 align-middle" />}
				onClick={() => signIn()}
			/>
		</section>
	)
}

function UserIsLoggedIn({ session }) {
	const dispatch = useAppDispatch()

	const fetchPersonalData = async () => {
		const res = await axios.get(`/api/account/data`)
		return res.data
	}

	const fetchPersonalDataQuery = useQuery(
		"REQUEST_USER_DATA",
		fetchPersonalData,
		{
			onSuccess: (data) => {
				const jsonBlob = new Blob([JSON.stringify(data)], {
					type: "application/javascript;charset=utf-8",
				})
				const downloadLink = window.URL.createObjectURL(jsonBlob)
				window.open(downloadLink)
			},
			onError: () => {
				dispatch(setErrorMessage(`Couldn't fetch personal data!`))
			},
			enabled: false,
			retry: false,
		}
	)

	const deleteAccount = async () => {
		const res = await axios.get(`/api/account/delete`)
		return res
	}

	const deleteAccountQuery = useQuery("DELETE_USER_ACCOUNT", deleteAccount, {
		onSuccess: () => {
			signOut()
		},
		onError: () => {
			dispatch(setErrorMessage(`Couldn't delete your account!`))
		},
		enabled: false,
		retry: false,
	})

	return (
		<section className="mx-2 space-y-2 pt-4">
			<h1 className="text-3xl font-bold">Welcome, {session.user.name}</h1>
			<p>
				You can create a new spellbook by clicking on the{" "}
				<Link
					href="/spellbooks"
					className="rounded-md bg-primaryLight-200 p-1"
				>
					<BookmarkAltIcon className="inline-block h-6 w-6 align-bottom" />
					Spellbooks
				</Link>{" "}
				button in the header.
			</p>
			<h2 className="text-2xl font-bold">Your account</h2>
			<ul className="space-y-2">
				<li>
					<PrimaryButton
						title="Log Out"
						icon={<LogoutIcon className="h-6 w-6 align-middle" />}
						onClick={() => signOut()}
					/>
				</li>
				<li>
					<Button
						title="Download data"
						icon={<DownloadIcon className="h-6 w-6 align-middle" />}
						onClick={() => fetchPersonalDataQuery.refetch()}
					/>
				</li>
				<li>
					<DangerButton
						title="Delete Account"
						icon={<TrashIcon className="h-6 w-6 align-middle" />}
						onClick={() => deleteAccountQuery.refetch()}
					/>
				</li>
			</ul>
		</section>
	)
}
