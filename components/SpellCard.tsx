import { MinusIcon, PlusIcon } from "@heroicons/react/outline"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { add, remove } from "../store/reducers/spellbook"
import { capitalize, getLevelSuffix, getSchoolName } from "../utils/parseSpell"
import { Spell } from "../types/Spell"
import { filter } from "../store/reducers/spells"

export default function (props: { spell: Spell; selected: boolean }) {
	const spell = props.spell
	const isSelected = props.selected

	// TODO: add store spellbook, if no spellbook, not selecteable
	const spellbook = useAppSelector((state) => state.spellbook)
	const filters = useAppSelector((state) => state.spellStore.filters)

	const dispatch = useAppDispatch()

	function _clickBookmarkButton() {
		if (isSelected) dispatch(remove(spell.id))
		else dispatch(add(spell.id))
	}

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
			key={spell.id}
			className={"relative col-span-1 flex max-h-[38rem] flex-col rounded-xl border-2 border-primaryLight-300  bg-primaryLight-100 p-4 text-base text-primaryLight-800 transition-colors hover:border-primaryLight-600 hover:shadow-primaryLight-300"}
		>
			<div className="flex justify-between">
				<h3 className="inline-block self-center text-lg font-bold shadow-primaryLight-300 drop-shadow-md">
					{spell.name}
				</h3>
				<button
					className={`inline-flex aspect-square h-10 w-10 justify-center self-start rounded-full border-2 border-primaryLight-300 bg-primaryLight-200 text-primaryLight-500 transition-colors hover:border-primaryLight-600 hover:text-primaryLight-800 ${
						spellbook.id.length < 1 && "hidden"
					}`}
					onClick={_clickBookmarkButton}
				>
					<span className="h-full w-full self-center text-2xl">
						{isSelected ? (
							<MinusIcon className="inline-block h-6 w-6" />
						) : (
							<PlusIcon className="inline-block h-6 w-6" />
						)}
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
				<b className="shadow-primaryLight-300 drop-shadow-md">
					Casting Time:{" "}
				</b>
				{spell.castingTime}
			</p>
			<p>
				<b className="shadow-primaryLight-300 drop-shadow-md">
					Range:{" "}
				</b>
				{spell.range}
			</p>
			<p>
				<b className="shadow-primaryLight-300 drop-shadow-md">
					Duration:{" "}
				</b>
				{spell.concentration
					? `Concentration, ${spell.duration.toLowerCase()}`
					: spell.duration}
			</p>

			<ScrollableDescription>
				<div>
					<p>
						<b className="sticky top-0 z-40 pr-1 shadow-primaryLight-300 drop-shadow-md">
							Components:
						</b>
						{spell.components}{" "}
						{spell.materials === "" ? "" : `(${spell.materials})`}
					</p>
				</div>
				<div>
					<b className="sticky top-0 z-40 block shadow-primaryLight-300 drop-shadow-md">
						Description:
					</b>
					<div
						className="text-gray-800 hyphenate indent-4"
						// rome-ignore lint/security/noDangerouslySetInnerHtml: the input is not editable anyway
						dangerouslySetInnerHTML={{ __html: spell.desc }}
					/>
				</div>
			</ScrollableDescription>

			<ul className="flex flex-grow flex-wrap content-end gap-1 pt-2">
				{spell.class.map((cls) => (
					<li key={cls} className="inline-block ">
						<button
							title={`Filter by class '${cls}'`}
							className="block cursor-pointer rounded-full bg-primaryLight-300 px-2 py-0.5 text-primaryLight-900 "
							onClick={
								() => dispatch(filter({ ...filters, class: cls }))
							}
						>
							{capitalize(cls)}
						</button>
					</li>
				))}
			</ul>
		</li>
	)
}

const ScrollableDescription = ({ children }) => {
	const scrollDivRef = useRef(null)
	const [isStartScroll, setIsStartScroll] = useState(true)
	const [isEndScroll, setIsEndScroll] = useState(false)

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
		<div className="relative flex-grow">
			<div
				className={"pointer-events-none absolute top-0 z-30 h-10 w-full bg-gradient-to-b from-primaryLight-100"}
				hidden={isStartScroll}
			/>
			<div
				onScroll={_handleScroll}
				ref={scrollDivRef}
				className="relative max-h-48 overflow-y-auto"
			>
				{children}
			</div>
			<div
				className={"pointer-events-none absolute bottom-0 z-30 h-10 w-full bg-gradient-to-t from-primaryLight-100"}
				hidden={isEndScroll}
			/>
		</div>
	)
}

export function SpellCardPlaceholder() {
	return (
		<li
			className={"relative col-span-1 flex animate-pulse flex-col space-y-2 rounded-xl border-2  border-primaryLight-300 bg-primaryLight-100  p-4 text-base text-primaryLight-800"}
		>
			<div className="flex justify-between">
				<span className="block h-6 w-full self-center rounded-full bg-primaryLight-300" />
			</div>
			<span className="block h-4 w-36 rounded-full bg-primaryLight-300" />
			<span className="block h-4 w-24 rounded-full bg-primaryLight-300" />
			<span className="block h-4 w-28 rounded-full bg-primaryLight-300" />
			<span className="block h-4 w-16 rounded-full bg-primaryLight-300" />
			<span className="block h-4 w-20 rounded-full bg-primaryLight-300" />

			<div className="grid grid-cols-12 gap-1">
				<span className="col-span-4 inline-block h-3 rounded-full bg-primaryLight-300" />
				<span className="col-span-2 inline-block h-3 rounded-full bg-primaryLight-300" />
				<span className="col-span-3 inline-block h-3 rounded-full bg-primaryLight-300" />
				<span className="col-span-7 inline-block h-3 rounded-full bg-primaryLight-300" />
				<span className="col-span-5 inline-block h-3 rounded-full bg-primaryLight-300" />
				<span className="col-span-3 inline-block h-3 rounded-full bg-primaryLight-300" />
				<span className="col-span-5 inline-block h-3 rounded-full bg-primaryLight-300" />
				<span className="col-span-3 inline-block h-3 rounded-full bg-primaryLight-300" />
				<span className="col-span-2 inline-block h-3 rounded-full bg-primaryLight-300" />
			</div>

			<ul className="flex flex-grow flex-wrap content-end gap-1 py-2">
				<li className="inline-block h-6 w-16 rounded-full bg-primaryLight-300 px-2 py-0.5 text-primaryLight-900" />
				<li className="inline-block h-6 w-16 rounded-full bg-primaryLight-300 px-2 py-0.5 text-primaryLight-900" />
				<li className="inline-block h-6 w-16 rounded-full bg-primaryLight-300 px-2 py-0.5 text-primaryLight-900" />
			</ul>
		</li>
	)
}
