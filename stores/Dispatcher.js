import { cloneElement, createContext, useEffect, useReducer } from "react"
import { initialSettings, settingsReducer } from "../stores/settings"
import { initialSpellbook, spellbookReducer } from "../stores/spellbook"
import { spellInit, spellReducer } from "../stores/spells"
import { fetchSpells } from "../utils/fetchSpell"

export const Dispatchers = createContext(null)

export function Dispatcher({ children }) {
	const [spells, spellDispatch] = useReducer(spellReducer, [], spellInit)
	const [spellbook, spellbookDispatch] = useReducer(
		spellbookReducer,
		initialSpellbook
	)
	const [settings, settingsDispatch] = useReducer(
		settingsReducer,
		initialSettings
	)

	useEffect(async () => {
		let data = await fetchSpells()
		if (data) spellDispatch({ type: "reset", payload: data })
	}, [])

	const dispatchers = {
		spellDispatch,
		spellbookDispatch,
		settingsDispatch,
	}

	const props = {
		spells,
		spellbook,
		settings,
	}

	return (
		<Dispatchers.Provider value={dispatchers}>
			{cloneElement(children, { ...props })}
		</Dispatchers.Provider>
	)
}
