import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."

export interface SettingsState {
	showFilters: boolean
	enableFilters: boolean
	messageQueue: Message[]
}

export type MessageType = "ERROR" | "WARNING" | "SUCCESS" | "PRIMARY"

export interface Message {
	text: string
	type: MessageType
}

const initialState: SettingsState = {
	showFilters: true,
	enableFilters: false,
	messageQueue: [],
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
		queueMessage: (state, action: PayloadAction<Message>) => {
			state.messageQueue.push(action.payload)
		},
		dequeueMessage: (state, action: PayloadAction<number>) => {
			state.messageQueue.splice(action.payload, 1)
		},
	},
})

export const {
	toggleFilterVisibility,
	enableFilters,
	disableFilters,
	queueMessage,
	dequeueMessage,
} = settingsSlice.actions

export const selectFilterVisibility = (state: RootState) =>
	state.settings.showFilters
export const selectErrorMessage = (state: RootState) =>
	state.settings.messageQueue

export default settingsSlice.reducer
