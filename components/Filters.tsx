import { useRef } from "react"
import { useAppDispatch } from "../store"
import {
	filterByClass,
	filterByLevel,
	filterBySchool,
	search,
} from "../store/reducers/spells"
import { capitalize } from "../utils/parseSpell"

export default function Filters() {
	const dispatch = useAppDispatch()

	// Search timer
	let timeout = useRef<ReturnType<typeof setTimeout>>()

	const _filterSearch = (e) => {
		// Reset timeout
		clearTimeout(timeout.current)

		// After a moment from last input, dispatch search
		timeout.current = setTimeout(() => {
			dispatch(search(e.target.value))
		}, 500)
	}

	const SCHOOLS = [
		"ANY",
		"ABJURATION",
		"CONJURATION",
		"DIVINATION",
		"ENCHANTMENT",
		"EVOCATION",
		"ILLUSION",
		"NECROMANCY",
		"TRANSMUTATION",
	]

	const CLASSES = [
		"ANY",
		"BARD",
		"CLERIC",
		"DRUID",
		"PALADIN",
		"RANGER",
		"SORCERER",
		"WARLOCK",
		"WIZARD",
		"ARTIFICIER",
	]

	const LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

	const _filterBySchool = (e) => {
		dispatch(filterBySchool(e.target.value))
	}

	const _filterByClass = (e) => {
		dispatch(filterByClass(e.target.value))
	}

	const _filterByLevel = (e) => {
		dispatch(filterByLevel(e.target.value))
	}

	return (
		<div className="block w-full bg-primaryLight-300 bg-opacity-90 shadow-md shadow-primaryLight-100 backdrop-blur-md md:rounded-2xl">
			<div className="m-2 inline-block">
				<input
					className="h-12 rounded-xl border-none p-2 focus:outline-none"
					type="search"
					onChange={_filterSearch}
					placeholder="Search..."
				/>
			</div>
			<div className="my-2 mr-2 inline-block">
				<label htmlFor="schoolFilter" className="mr-2">
					School
				</label>
				<select
					id="schoolFilter"
					className="h-12 rounded-xl border-none bg-primaryLight-50 p-2 focus:outline-none"
					onChange={_filterBySchool}
				>
					{SCHOOLS.map((a) => (
						<option value={a} key={a}>
							{capitalize(a)}
						</option>
					))}
				</select>
			</div>
			<div className="my-2 mr-2 inline-block">
				<label htmlFor="classFilter" className="mr-2">
					Class
				</label>
				<select
					id="classFilter"
					className="h-12 rounded-xl border-none bg-primaryLight-50 p-2 focus:outline-none"
					onChange={_filterByClass}
				>
					{CLASSES.map((a) => (
						<option value={a} key={a}>
							{capitalize(a)}
						</option>
					))}
				</select>
			</div>
			<div className="my-2 mr-2 inline-block">
				<label htmlFor="levelFilter" className="mr-2">
					Level
				</label>
				<select
					id="levelFilter"
					className="h-12 rounded-xl border-none bg-primaryLight-50 p-2 focus:outline-none"
					onChange={_filterByLevel}
				>
					<option value={-1}>Any</option>
					{LEVELS.map((a) => (
						<option value={a} key={a}>
							{a === 0 ? "Cantrip" : a}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}
