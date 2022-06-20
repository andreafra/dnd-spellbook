import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Spell } from "../../types/Spell"

const initialState: Spell[] = []

export const spellsSlice = createSlice({
	name: "spells",
	initialState,
	reducers: {
		load: (_, action: PayloadAction<Spell[]>) => action.payload,
		search: (state, action: PayloadAction<string>) => {
			state.forEach((a) => {
				a.visible = a.name
					.toLowerCase()
					.includes(action.payload.toLowerCase())
			})
		},
		filterBySchool: (state, action: PayloadAction<string>) => {
			if (action.payload !== "ANY")
				state.forEach((a) => {
					a.visible = a.school === action.payload
				})
			else
				state.forEach((a) => {
					a.visible = true
				})
		},
		filterByClass: (state, action: PayloadAction<string>) => {
			if (action.payload !== "ANY")
				state.forEach((a) => {
					a.visible = a.class.includes(action.payload)
				})
			else
				state.forEach((a) => {
					a.visible = true
				})
		},
		filterByLevel: (state, action: PayloadAction<number>) => {
			if (action.payload >= 0)
				state.forEach((a) => {
					a.visible = a.level == action.payload
				})
			else
				state.forEach((a) => {
					a.visible = true
				})
		},
	},
})

export const { load, search, filterBySchool, filterByClass, filterByLevel } =
	spellsSlice.actions

export default spellsSlice.reducer
