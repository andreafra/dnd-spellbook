import Link from "next/link"

export const Spellbook = ({ title, size, id, onClick = undefined }) => (
	<Link href={`/spellbooks/${id}`}>
		<a
			onClick={onClick}
			className="mr-4 mb-4 inline-block h-64 w-52 rounded-xl border-l-8 border-red-900 bg-gradient-to-tr from-red-500 to-red-700 p-4 text-white"
		>
			<h3 className="text-xl font-bold italic">{title}</h3>
			<p className="font-bold">Spells: {size}</p>
		</a>
	</Link>
)
