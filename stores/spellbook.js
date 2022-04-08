import { Cookies } from "react-cookie"

const cookies = new Cookies()

export const initialSpellbook = cookies.get("spellbook") ?? {
	id: "",
	title: "",
	last_updated: (new Date()).toISOString(),
	spells: [],
}

export function spellbookReducer(state, action) {
	switch (action.type) {
		case "add":
			var newState = {
				...state,
				spells: [...state.spells, action.payload],
			}

			persistState(newState)

			return newState
		case "remove":
			var newState = {
				...state,
				spells: state.spells.filter((a) => a != action.payload),
			}

			persistState(newState)

			return newState
		case "init":
			var newState = action.payload
			
			persistState(newState)

			return newState
		case "rename":
			var newState = {...state, title: action.payload}

			persistState(newState)

			return newState
		default:
			throw new Error("Invalid settings action")
	}
}

async function persistState(state) {
	// Cache state in cookies
	cookies.set("spellbook", state, {
		sameSite: true,
		maxAge: 60 * 60 * 24 * 30 * 12,
		path: "/",
	})
}
