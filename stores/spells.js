// Store
export function spellInit(initialSpells = allSpells) {
  return initialSpells
}

export function spellReducer(state, action) {
  switch (action.type) {
    case "reset":
      return spellInit(action.payload)
    case "search":
      return state.map(({ visible, ...a }) => {
        return {
          visible: a.name.toLowerCase().includes(action.payload.toLowerCase()),
          ...a,
        }
      })
    default:
      throw new Error("Invalid spell action")
  }
}
