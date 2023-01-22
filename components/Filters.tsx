import { RefreshIcon } from "@heroicons/react/outline"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch } from "../store"
import { filter } from "../store/reducers/spells"
import { capitalize } from "../utils/parseSpell"
import { Button } from "./Button"

export default function Filters(): JSX.Element {
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
		<div
			className={`container z-10 mx-auto grid w-full grid-cols-2 items-end gap-2 px-2 pb-2 md:grid-cols-6 md:px-0`}
		>
			<div className="flex-grow-3 col-span-2">
				<label
					htmlFor="searchFilter"
					className="pl-2 font-semibold text-primaryLight-500"
				>
					Search
				</label>
				<input
					id="searchFilter"
					className="h-12 w-full appearance-none rounded-xl border-none bg-primaryLight-50 p-2 focus:outline-none"
					type="search"
					onChange={_filterByName}
					placeholder="Search..."
					value={filters.name}
				/>
			</div>
			<div className="">
				<label
					htmlFor="schoolFilter"
					className="pl-2 font-semibold text-primaryLight-500"
				>
					School
				</label>
				<select
					id="schoolFilter"
					className="h-12 w-full rounded-xl border-none bg-primaryLight-50 px-2 focus:outline-none"
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
			<div className="">
				<label
					htmlFor="classFilter"
					className="pl-2 font-semibold text-primaryLight-500"
				>
					Class
				</label>
				<select
					id="classFilter"
					className="h-12 w-full rounded-xl border-none bg-primaryLight-50 px-2 focus:outline-none"
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
			<div className="">
				<label
					htmlFor="levelFilter"
					className="pl-2 font-semibold text-primaryLight-500"
				>
					Level
				</label>
				<select
					id="levelFilter"
					className="h-12 w-full rounded-xl border-none bg-primaryLight-50 px-2 focus:outline-none"
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
			<div className="">
				<Button
					title="Reset"
					className="h-12 w-full self-end border-none"
					onClick={_resetFilters}
					icon={<RefreshIcon className="h-6 w-6" />}
				/>
			</div>
		</div>
	)
}
