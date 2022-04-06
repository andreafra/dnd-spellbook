import { cloneElement, createContext, useEffect, useReducer } from "react"
import { fetchSpells } from "../api/fetchSpell"
import { initialSettings, settingsReducer } from "../stores/settings"
import { initialSpellbook, spellbookReducer } from "../stores/spellbook"
import { spellInit, spellReducer } from "../stores/spells"
import "../styles/globals.css"

export const Dispatchers = createContext(null)

export default function App({ Component, pageProps }) {
  return (
    <Dispatcher>
      <Component {...pageProps} />
    </Dispatcher>
  )
}

function Dispatcher({ children }) {
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
