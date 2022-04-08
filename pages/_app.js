import { Dispatcher } from "../stores/Dispatcher"
import "../styles/globals.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { SessionProvider } from "next-auth/react"
import { Layout } from "../components/Layout"

const queryClient = new QueryClient()

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<Dispatcher>
					<Component {...pageProps} />
				</Dispatcher>
			</QueryClientProvider>
		</SessionProvider>
	)
}
