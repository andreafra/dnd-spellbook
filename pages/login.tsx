import { LoginIcon, LogoutIcon } from "@heroicons/react/outline"
import { signIn, signOut, useSession } from "next-auth/react"
import { PrimaryButton } from "../components/Button"

export default function Login() {
	const { data: session } = useSession()

	return (
		<section className="mx-2 space-y-4 pt-4">
			<h1 className="text-3xl font-bold">Login</h1>
			{session ? (
				<p>Welcome, {session.user.name}</p>
			) : (
				<p>
					To save your spells and sync across devices, continue with
					one of the following:
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
