import {
	BookmarkAltIcon,
	LoginIcon,
	LogoutIcon,
} from "@heroicons/react/outline"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { PrimaryButton } from "../components/Button"

export default function Login() {
	const { data: session } = useSession()

	return (
		<section className="mx-2 space-y-4 pt-4">
			<h1 className="text-3xl font-bold">Login</h1>
			{session ? (
				<>
					<p>Welcome, {session.user.name}.</p>
					<p>
						You can create a new spellbook by clicking on the{" "}
						<Link href="/spellbooks">
							<a className="rounded-md bg-primaryLight-200 p-1">
								<BookmarkAltIcon className="inline-block h-6 w-6 align-bottom" />
								Spellbooks
							</a>
						</Link>{" "}
						button in the header.
					</p>
				</>
			) : (
				<p>
					To save and sync your spellbooks across devices, please
					login:
				</p>
			)}
			<AuthButton />
		</section>
	)
}

const AuthButton = () => {
	const { data: session } = useSession()
	return session ? (
		<PrimaryButton
			title="Log Out"
			icon={<LogoutIcon className="h-6 w-6 align-middle" />}
			onClick={() => signOut()}
		/>
	) : (
		<PrimaryButton
			title="Log In"
			icon={<LoginIcon className="h-6 w-6 align-middle" />}
			onClick={() => signIn()}
		/>
	)
}
