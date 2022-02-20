import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SpellDataCtx } from "../components/DataContext";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
	const [spellData, setSpellData] = useState();

	// fetch JSON data
	useEffect(() => {
		const fetchSpellData = async () => {
			const req = await fetch("/data/spells.json", {
				method: "GET",
			});
			if (req.status !== 200) {
				throw "Couldn't fetch JSON";
			}
			const data = await req.json();
			const spells = data.allSpells;
			setSpellData(spells);
		};

		fetchSpellData().catch(console.error);
	}, []);

	return (
		<SpellDataCtx.Provider value={spellData}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SpellDataCtx.Provider>
	);
}

export default MyApp;
