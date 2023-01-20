import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."

export interface SettingsState {
	showFilters: boolean
	enableFilters: boolean
	errorMessage: string
}

const initialState: SettingsState = {
	showFilters: true,
	enableFilters: false,
	errorMessage: "",
}

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		toggleFilterVisibility: (state) => {
			state.showFilters = !state.showFilters
		},
		enableFilters: (state) => {
			state.enableFilters = true
		},
		disableFilters: (state) => {
			state.enableFilters = false
		},
		setErrorMessage: (state, action: PayloadAction<string>) => {
			state.errorMessage = action.payload
		},
	},
})

export const {
	toggleFilterVisibility,
	enableFilters,
	disableFilters,
	setErrorMessage,
} = settingsSlice.actions

export const selectFilterVisibility = (state: RootState) =>
	state.settings.showFilters
export const selectErrorMessage = (state: RootState) =>
	state.settings.errorMessage

export default settingsSlice.reducer
