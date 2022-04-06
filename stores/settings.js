export const initialSettings = {
  showFilters: false,
}

export function settingsReducer(state, action) {
  switch (action.type) {
    case "toggle_filter":
      return {
        ...state,
        showFilters: action.payload,
      }
    default:
      throw new Error("Invalid settings action")
  }
}
