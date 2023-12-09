import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { disableFilters, enableFilters } from "../store/reducers/settings"
import SpellCard, { SpellCardPlaceholder } from "./SpellCard"
import { FixedSizeGrid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

export default function SpellList({ showAllSpells = true }) {
	const spells = useAppSelector((state) => state.spellStore.spells)
	const filters = useAppSelector((state) => state.spellStore.filters)
	const spellIds = useAppSelector((state) => state.spellbook.spellIds) ?? []
	const dispatch = useAppDispatch()

	const [listColumns, setListColumns] = useState<number>(1)

	// TODO: Refactor this, or this might not belong here
	const spellList = useMemo(
		() =>
			(showAllSpells
				? spells
				: spells.filter((spell) => spellIds.indexOf(spell.id) > -1)
			).filter(
				(spell) =>
					(filters.name === "" ||
						spell.name
							.toLowerCase()
							.includes(filters.name.toLowerCase())) &&
					(filters.school === "ANY" ||
						spell.school === filters.school) &&
					(filters.class === "ANY" ||
						spell.class.includes(filters.class)) &&
					(filters.level < 0 || spell.level === filters.level)
			),
		[filters, spells, showAllSpells]
	)

	// Enable filters button on load, disables it on unload
	useEffect(() => {
		dispatch(enableFilters())
		return () => {
			dispatch(disableFilters())
		}
	}, [])

	const Row = ({ columnIndex, rowIndex, data, style }) => {
		const spell = data[rowIndex * listColumns + columnIndex]
		if (!spell) return null
		return (
			<div className="pb-4" style={style}>
				<SpellCard
					spell={spell}
					selected={spellIds.indexOf(spell.id) > -1}
				/>
			</div>
		)
	}

	const onAutoSizerResize = ({ height, width }) => {
		// sm: minWidth 640px
		// md: minWidth 768px
		const w = document.documentElement.clientWidth
		if (w < 640) {
			setListColumns(1)
		} else if (w < 768) {
			setListColumns(2)
		} else {
			setListColumns(3)
		}
	}

	return (
		<AutoSizer onResize={onAutoSizerResize}>
			{({ height, width }) => (
				<FixedSizeGrid
					height={height}
					width={width}
					columnCount={listColumns}
					rowCount={Math.ceil(spellList.length / listColumns)}
					columnWidth={Math.floor(width / listColumns)}
					rowHeight={350}
					itemData={spellList}
					itemKey={({ columnIndex, data, rowIndex }) => {
						const item = data[rowIndex]
						return `${item.id}-${columnIndex}`
					}}
				>
					{Row}
				</FixedSizeGrid>
			)}
		</AutoSizer>
	)
}
