import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"
import ToastProvider from "./Toast"

export function Layout({ children }) {
	return (
		<>
			<Head>
				<title>D&D Spellbook</title>
				<meta
					name="description"
					content="A Dungeons and Dragons spellbook to manage your spells"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main className="container mx-auto min-h-screen px-2 md:px-0">
				{children}
			</main>
			<Footer />
			<ToastProvider />
		</>
	)
}
