import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."

export interface ISettingsState {
	showFilters: boolean
	filterQuery: string
	errorMessage: string
}

const initialState: ISettingsState = {
	showFilters: false,
	filterQuery: "",
	errorMessage: "",
}

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		toggleFilterVisibility: (state) => {
			state.showFilters = !state.showFilters
		},
		setFilterQuery: (state, action: PayloadAction<string>) => {
			state.filterQuery = action.payload
		},
		setErrorMessage: (state, action: PayloadAction<string>) => {
			state.errorMessage = action.payload
		},
	},
})

export const { toggleFilterVisibility, setErrorMessage, setFilterQuery } =
	settingsSlice.actions

export const selectFilterVisibility = (state: RootState) =>
	state.settings.showFilters
export const selectErrorMessage = (state: RootState) =>
	state.settings.errorMessage

export default settingsSlice.reducer
