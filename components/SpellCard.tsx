import { MinusIcon, PlusIcon } from "@heroicons/react/outline"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { add, remove } from "../store/reducers/spellbook"
import { capitalize, getLevelSuffix, getSchoolName } from "../utils/parseSpell"
import { Spell } from "../types/Spell"

export default function (props: { spell: Spell; selected: boolean }) {
	const spell = props.spell
	const isSelected = props.selected

	// TODO: add store spellbook, if no spellbook, not selecteable
	const spellbook = useAppSelector((state) => state.spellbook)

	const dispatch = useAppDispatch()

	function _handleSpellbookButton() {
		if (isSelected) dispatch(remove(spell.id))
		else dispatch(add(spell.id))
	}

	const school = spell.school.toLowerCase()

	const styles = {
		abjuration:
			"border-abjuration-300 bg-abjuration-100 text-abjuration-800 hover:border-abjuration-600 hover:shadow-abjuration-300",
		conjuration:
			"border-conjuration-300 bg-conjuration-100 text-conjuration-800 hover:border-conjuration-600 hover:shadow-conjuration-300",
		divination:
			"border-divination-300 bg-divination-100 text-divination-800 hover:border-divination-600 hover:shadow-divination-300",
		enchantment:
			"border-enchantment-300 bg-enchantment-100 text-enchantment-800 hover:border-enchantment-600 hover:shadow-enchantment-300",
		evocation:
			"border-evocation-300 bg-evocation-100 text-evocation-800 hover:border-evocation-600 hover:shadow-evocation-300",
		illusion:
			"border-illusion-300 bg-illusion-100 text-illusion-800 hover:border-illusion-600 hover:shadow-illusion-300",
		necromancy:
			"border-necromancy-300 bg-necromancy-100 text-necromancy-800 hover:border-necromancy-600 hover:shadow-necromancy-300",
		transmutation:
			"border-transmutation-300 bg-transmutation-100 text-transmutation-800 hover:border-transmutation-600 hover:shadow-transmutation-300",
	}

	return (
		<li
			className={`relative m-2 rounded-xl border-2  border-primaryLight-300 bg-primaryLight-100  p-4 text-base text-primaryLight-800 transition-colors hover:border-primaryLight-600 hover:shadow-primaryLight-300 ${
				!spell.visible ? "hidden" : ""
			}`}
		>
			<div className="flex justify-between">
				<h3 className="self-center text-lg font-bold">{spell.name}</h3>
				<button
					className={`top-0 right-0 flex h-10 w-10 justify-center self-center rounded-full border-2 border-primaryLight-300 bg-primaryLight-200 text-primaryLight-500 transition-colors hover:border-primaryLight-600 hover:text-primaryLight-800 ${
						spellbook.id.length < 1 && "hidden"
					}`}
					onClick={_handleSpellbookButton}
				>
					<span className="self-center text-2xl">
						{isSelected ? <MinusIcon /> : <PlusIcon />}
					</span>
				</button>
			</div>
			<p>
				<i className="capitalize">
					{spell.level === 0
						? `${getSchoolName(spell.school)} cantrip`
						: `${spell.level}${getLevelSuffix(
								spell.level
						  )}-level ${getSchoolName(spell.school)}`}
				</i>
			</p>
			<p>
				<b>Casting Time: </b>
				{spell.castingTime}
			</p>
			<p>
				<b>Range: </b>
				{spell.range}
			</p>
			<p>
				<b>Components: </b>
				{spell.components}
				{spell.materials === "" ? "" : `(${spell.materials})`}
			</p>
			<p>
				<b>Duration: </b>
				{spell.concentration
					? `Concentration, ${spell.duration.toLowerCase()}`
					: spell.duration}
			</p>

			<ScrollableDescription value={spell.desc} />

			<ul className="space-x-1 overflow-x-auto py-2">
				{spell.class.map((cls) => (
					<li
						key={cls}
						className="inline-block rounded-full bg-primaryLight-300 px-2 py-0.5 text-primaryLight-900"
					>
						{capitalize(cls)}
					</li>
				))}
			</ul>
		</li>
	)
}

const ScrollableDescription = ({ value }) => {
	let scrollDivRef = useRef(null)
	let [isStartScroll, setIsStartScroll] = useState(true)
	let [isEndScroll, setIsEndScroll] = useState(false)

	useEffect(() => {
		setIsEndScroll(
			scrollDivRef.current &&
				scrollDivRef.current.offsetHeight +
					scrollDivRef.current.scrollTop >=
					scrollDivRef.current.scrollHeight
		)
	}, [scrollDivRef.current])

	function _handleScroll(e) {
		setIsStartScroll(
			scrollDivRef.current && scrollDivRef.current.scrollTop <= 0
		)
		setIsEndScroll(
			scrollDivRef.current &&
				scrollDivRef.current.offsetHeight +
					scrollDivRef.current.scrollTop >=
					scrollDivRef.current.scrollHeight
		)
	}

	// const styles = {
	// 	abjuration: "from-abjuration-100",
	// 	conjuration: "from-conjuration-100",
	// 	divination: "from-divination-100",
	// 	enchantment: "from-enchantment-100",
	// 	evocation: "from-evocation-100",
	// 	illusion: "from-illusion-100",
	// 	necromancy: "from-necromancy-100",
	// 	transmutation: "from-transmutation-100",
	// }

	return (
		<div className="relative indent-4 ">
			<div
				className={`pointer-events-none absolute top-0 h-10 w-full bg-gradient-to-b from-primaryLight-100`}
				hidden={isStartScroll}
			/>
			<div
				onScroll={_handleScroll}
				ref={scrollDivRef}
				className="text-gray-800 max-h-48 overflow-y-auto"
				dangerouslySetInnerHTML={{ __html: value }}
			></div>
			<div
				className={`pointer-events-none absolute bottom-0 h-10 w-full bg-gradient-to-t from-primaryLight-100`}
				hidden={isEndScroll}
			/>
		</div>
	)
}
