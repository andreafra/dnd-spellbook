import "../styles/globals.css"

import { useReducer } from "react"
import { useEffect, useState } from "react"
import { fetchSpells } from "../api/fetchSpell"
import { createContext } from "react"

let allSpells = []

export const SpellDispatch = createContext(null)

export default function App({ Component, pageProps }) {
  const [spells, spellDispatch] = useReducer(spellReducer, [], init)

  useEffect(async () => {
    let data = await fetchSpells()
    allSpells = data
    if (data) spellDispatch({ type: "reset", payload: data })
  }, [])

  return (
    <SpellDispatch.Provider value={spellDispatch}>
      <Component {...pageProps} spells={spells} />
    </SpellDispatch.Provider>
  )
}

// Store
function init(initialSpells = allSpells) {
  return initialSpells
}

function spellReducer(state, action) {
  switch (action.type) {
    case "reset":
      return init(action.payload)
    case "search":
      return state.map(({ visible, ...a }) => {
        return {
          visible: a.name.includes(action.payload),
          ...a,
        }
      })
    default:
      throw new Error()
  }
}
