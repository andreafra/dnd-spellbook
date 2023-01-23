import Link from "next/link"

export const Spellbook = ({ title, size, id, onClick = undefined }) => (
	<Link
		href={`/spellbooks/${id}`}
		onClick={onClick}
		className="text-white mr-4 mb-4 inline-block h-64 w-52 rounded-xl border-l-8 border-danger-900 bg-gradient-to-tr from-danger-500 to-danger-700 p-4"
	>
		<h3 className="text-xl font-bold italic">{title}</h3>
		<p className="font-bold">Spells: {size}</p>
	</Link>
)
