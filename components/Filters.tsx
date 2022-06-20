import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch } from "../store"
import { filter } from "../store/reducers/spells"
import { capitalize } from "../utils/parseSpell"

export default function Filters() {
	const dispatch = useAppDispatch()

	const defaultFilters = {
		name: "",
		school: "ANY",
		class: "ANY",
		level: -1,
	}

	const [filters, setFilters] = useState(defaultFilters)

	// Search timer
	let timeout = useRef<ReturnType<typeof setTimeout>>()

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

	useEffect(() => {
		// Reset timeout
		clearTimeout(timeout.current)

		// After a moment from last input, dispatch search
		timeout.current = setTimeout(() => {
			dispatch(filter(filters))
		}, 500)
	}, [filters])

	const LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

	const _filterByName = (e) => {
		setFilters({ ...filters, name: e.target.value })
	}

	const _filterBySchool = (e) => {
		setFilters({ ...filters, school: e.target.value })
	}

	const _filterByClass = (e) => {
		setFilters({ ...filters, class: e.target.value })
	}

	const _filterByLevel = (e) => {
		setFilters({ ...filters, level: e.target.value })
	}

	const _resetFilters = () => {
		setFilters(defaultFilters)
	}

	return (
		<div className="block w-full bg-primaryLight-300 bg-opacity-90 shadow-md shadow-primaryLight-100 backdrop-blur-md md:rounded-2xl">
			<div className="m-2 inline-block">
				<input
					className="h-12 rounded-xl border-none p-2 focus:outline-none"
					type="search"
					onChange={_filterByName}
					placeholder="Search..."
					value={filters.name}
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
					value={filters.school}
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
					value={filters.class}
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
					value={filters.level}
				>
					<option value={-1}>Any</option>
					{LEVELS.map((a) => (
						<option value={a} key={a}>
							{a === 0 ? "Cantrip" : a}
						</option>
					))}
				</select>
			</div>
			<div className="my-2 mr-2 inline-block">
				<button
					className="h-12 justify-center rounded-xl border-2 border-primaryLight-400 transition-colors hover:bg-primaryLight-400  md:px-4"
					onClick={_resetFilters}
				>
					Reset
				</button>
			</div>
		</div>
	)
}
