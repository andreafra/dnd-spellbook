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
	console.log(spellbook.id)

	const dispatch = useAppDispatch()

	function _handleSpellbookButton() {
		if (isSelected) dispatch(remove(spell.id))
		else dispatch(add(spell.id))
	}

	return (
		<li
			className={`relative m-2 rounded-xl border-2 border-primaryLight-300 bg-primaryLight-100 p-4 text-base text-primaryLight-800 transition-colors hover:border-primaryLight-600 hover:shadow-primaryLight-300 ${
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

	return (
		<div className="relative indent-4 ">
			<div
				className="pointer-events-none absolute top-0 h-10 w-full bg-gradient-to-b from-primaryLight-100"
				hidden={isStartScroll}
			/>
			<div
				onScroll={_handleScroll}
				ref={scrollDivRef}
				className="max-h-48 overflow-y-auto text-gray-800"
				dangerouslySetInnerHTML={{ __html: value }}
			></div>
			<div
				className="pointer-events-none absolute bottom-0 h-10 w-full bg-gradient-to-t from-primaryLight-100"
				hidden={isEndScroll}
			/>
		</div>
	)
}
