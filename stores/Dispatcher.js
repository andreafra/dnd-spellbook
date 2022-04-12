import { cloneElement, createContext, useEffect, useReducer } from "react"
import { initialSettings, settingsReducer } from "../stores/settings"
import { initialSpellbook, spellbookReducer } from "../stores/spellbook"
import { spellInit, spellReducer } from "../stores/spells"
import { fetchSpells } from "../utils/fetchSpell"

import { useQuery } from "react-query"

export const Dispatchers = createContext(null)

export function Dispatcher({ children }) {

	const {error, data} = useQuery('spellRawData', () => 
		fetchSpells()
	)

	const [spells, spellDispatch] = useReducer(spellReducer, [], spellInit)
	const [spellbook, spellbookDispatch] = useReducer(
		spellbookReducer,
		initialSpellbook
	)
	const [settings, settingsDispatch] = useReducer(
		settingsReducer,
		initialSettings
	)

	
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

	useEffect(() => {
		// When data is ready, update the spell store
		if (data) spellDispatch({ type: "reset", payload: data })
	}, [data])

	return (
		<Dispatchers.Provider value={dispatchers}>
			{cloneElement(children, { ...props })}
		</Dispatchers.Provider>
	)
}
