import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Spell } from "../../types/Spell"

const initialState: SpellStore = {
	filters: {
		name: "",
		class: "ANY",
		school: "ANY",
		level: -1,
	},
	spells: [],
}

export interface SpellStore {
	filters: Filters
	spells: Spell[]
}

export interface Filters {
	name: string
	school: string
	class: string
	level: number
}

export const spellsSlice = createSlice({
	name: "spells",
	initialState,
	reducers: {
		loadSpells: (state, action: PayloadAction<Spell[]>) => ({
			...state,
			spells: action.payload,
		}),

		filter: (state, action: PayloadAction<Filters>) => ({
			...state,
			filters: action.payload,
			// state.forEach((a) => {
			// 	a.visible =
			// 		(filters.name === "" ||
			// 			a.name.toLowerCase().includes(filters.name)) &&
			// 		(filters.school === "ANY" || a.school === filters.school) &&
			// 		(filters.class === "ANY" ||
			// 			a.class.includes(filters.class)) &&
			// 		(filters.level < 0 || a.level == filters.level)
			// })
		}),
	},
})

export const { loadSpells, filter } = spellsSlice.actions

export default spellsSlice.reducer
