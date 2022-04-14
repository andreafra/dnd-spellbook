import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Cookies } from "react-cookie"
import { Spellbook } from "../../types/Spellbook"

const cookies = new Cookies()

const initialState: Spellbook = cookies.get("spellbook") ?? {
	id: "",
	title: "",
	last_updated: new Date().toISOString(),
	spellIds: [],
}

export const spellbookSlice = createSlice({
	name: "spellbook",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<string>) => {
			state.spellIds.push(action.payload)
		},
		remove: (state, action: PayloadAction<string>) => {
			state.spellIds.splice(state.spellIds.indexOf(action.payload), 1)
		},
		rename: (state, action: PayloadAction<string>) => {
			state.title = action.payload
		},
		load: (_, action: PayloadAction<Spellbook>) => action.payload,
	},
})

export const { add, remove, rename, load } = spellbookSlice.actions

export default spellbookSlice.reducer

async function persistState(state) {
	// Cache state in cookies
	cookies.set("spellbook", state, {
		sameSite: true,
		maxAge: 60 * 60 * 24 * 30 * 12,
		path: "/",
	})
}
