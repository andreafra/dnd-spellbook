import { Layout } from "../components/Layout"
import { SpellList } from "../components/SpellList"

export default function Home() {
	return (
		<Layout>
			<section className="grid list-none grid-cols-1 pt-2 sm:grid-cols-2 md:grid-cols-3">
				<SpellList />
			</section>
		</Layout>
	)
}
