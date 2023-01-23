import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import settingsReducer from "./reducers/settings"
import spellbookReducer from "./reducers/spellbook"
import spellReducer from "./reducers/spells"

export const store = configureStore({
	reducer: {
		spellStore: spellReducer,
		spellbook: spellbookReducer,
		settings: settingsReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
