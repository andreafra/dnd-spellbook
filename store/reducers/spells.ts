import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ISpell } from "../../types/Spell"
import Fuse from "fuse.js"

const initialState: ISpell[] = []

const fuseOptions: Fuse.IFuseOptions<ISpell> = {
	includeScore: true,
	keys: ["name", "school", "class"],
}

export const filter = new Fuse([], fuseOptions)

export const spellsSlice = createSlice({
	name: "spells",
	initialState,
	reducers: {
		load: (_, action: PayloadAction<ISpell[]>) => {
			filter.setCollection(action.payload)
			return action.payload
		},
	},
})

export const { load } = spellsSlice.actions

export default spellsSlice.reducer
