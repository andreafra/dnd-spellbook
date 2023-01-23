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

export const SpellbookPlaceholder = () => (
	<div className="mr-4 mb-4 inline-block h-64 w-52 rounded-xl border-l-8 border-primaryLight-500 bg-gradient-to-tr from-primaryLight-500 to-primaryLight-400 p-4">
		<div className="grid animate-pulse grid-cols-3 gap-2 py-2">
			<span className="col-span-3 block h-5 w-full rounded-full bg-primaryLight-300"></span>
			<span className="col-span-1 block h-3 w-full  rounded-full bg-primaryLight-300"></span>
			<span className="col-span-2 block h-3 w-full rounded-full bg-primaryLight-300"></span>{" "}
			<span className="col-span-2 block h-3 w-full rounded-full bg-primaryLight-300"></span>
			<span className="col-span-1 block h-3 w-full  rounded-full bg-primaryLight-300"></span>
		</div>
	</div>
)
