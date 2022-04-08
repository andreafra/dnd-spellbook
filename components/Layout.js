import Head from "next/head";
import Header from "./Header";

export function Layout({children}) {
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

			<Header />

			<main className="mx-2 pt-4 space-y-4">
				{children}
			</main>
		</div>
    )
}