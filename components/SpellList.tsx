import { useContext } from "react";
import { SpellDataCtx } from "./DataContext";
import SpellCard from "./SpellCard";

export default function () {
	let spells = useContext(SpellDataCtx);

	if (!spells || spells.length === 0) return <p>Loading...</p>;

	return (
		<ul className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 py-4">
			{spells.map((value) => {
				return <SpellCard key={value.name} spell={value}></SpellCard>;
			})}
		</ul>
	);
}
