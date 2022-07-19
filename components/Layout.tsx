import Head from "next/head"
import { useRouter } from "next/router"
import Header from "./Header"

export function Layout({ children }) {
	const router = useRouter()

	const shouldShowFilters =
		router.pathname === "/" || router.pathname.startsWith("/spellbooks/")

	return (
		<div className="container mx-auto">
			<Head>
				<title>D&D Spellbook</title>
				<meta
					name="description"
					content="A Dungeons and Dragons spellbook to manage your spells"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header showFilters={shouldShowFilters} />

			<main className="mx-2 space-y-4 pt-4">{children}</main>

			<footer>
				<a
					href="https://www.iubenda.com/privacy-policy/37495534"
					title="Privacy Policy"
				>
					Privacy Policy
				</a>
				<a
					href="https://www.iubenda.com/terms-and-conditions/37495534"
					title="Terms and Conditions"
				>
					Terms and Conditions
				</a>
			</footer>
		</div>
	)
}
