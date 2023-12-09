import { SessionProvider } from "next-auth/react"
import { StrictMode, useEffect } from "react"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import { Provider } from "react-redux"
import { Layout } from "../components/Layout"
import { store, useAppDispatch, useAppSelector } from "../store"
import { loadSpells } from "../store/reducers/spells"
import "../styles/globals.css"
import { fetchSpells } from "../utils/fetchSpell"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
})

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<div className="text-primaryLight-900">
			<StrictMode>
				<SessionProvider session={session}>
					<QueryClientProvider client={queryClient}>
						<Provider store={store}>
							<Layout>
								<SpellLoader />
								<Component {...pageProps} />
							</Layout>
						</Provider>
					</QueryClientProvider>
				</SessionProvider>
			</StrictMode>
		</div>
	)
}

/**
 * A component that requests the spell list and loads it into the Redux Store
 */
function SpellLoader() {
	const spells = useAppSelector((state) => state.spellStore.spells)
	const dispatch = useAppDispatch()

	const { data } = useQuery("spellRawData", () => fetchSpells())

	useEffect(() => {
		// When data is ready, update the spell store
		if (data && spells.length === 0) dispatch(loadSpells(data))
	}, [data])

	return null
}
