import SpellCard from "../components/SpellCard"
import SpellList from "../components/SpellList"
import { useAppSelector } from "../store"

export default function Home() {
	return (
		<section>
			<SpellList />
		</section>
	)
}
