import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."

export interface SettingsState {
	showFilters: boolean
	errorMessage: string
}

const initialState: SettingsState = {
	showFilters: false,
	errorMessage: "",
}

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		toggleFilterVisibility: (state) => {
			state.showFilters = !state.showFilters
		},
		setErrorMessage: (state, action: PayloadAction<string>) => {
			state.errorMessage = action.payload
		},
	},
})

export const { toggleFilterVisibility, setErrorMessage } = settingsSlice.actions

export const selectFilterVisibility = (state: RootState) =>
	state.settings.showFilters
export const selectErrorMessage = (state: RootState) =>
	state.settings.errorMessage

export default settingsSlice.reducer
