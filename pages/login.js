import Head from "next/head"
import Header from "../components/Header"
import { Login, Logout } from "../components/Icons"
import { Button } from "../components/Button"
import { useSession, signIn, signOut } from "next-auth/react"
import { Layout } from "../components/Layout"

export default function Home({ spells, spellbook, settings }) {
	const { data: session } = useSession()

	return (
		<Layout>
			<section className="mx-2 pt-4 space-y-4">
				<h1 className="text-3xl font-bold">Login</h1>
				{session ? (
					<p>Welcome, {session.user.name}</p>
				) : (
					<p>
						To save your spells and sync across devices, continue
						with one of the following:
					</p>
				)}
				<AuthButton />
			</section>
		</Layout>
	)
}

const AuthButton = () => {
	const { data: session } = useSession()
	return session ? (
		<Button title="Log Out" icon={Logout} onClick={() => signOut()} />
	) : (
		<Button
			title="Log In"
			icon={Login}
			onClick={() => signIn()}
		/>
	)
}
