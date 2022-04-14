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
	},
})

export const { load, search } = spellsSlice.actions

export default spellsSlice.reducer
