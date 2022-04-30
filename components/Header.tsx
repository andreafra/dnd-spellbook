import {
	BookmarkAltIcon,
	FilterIcon,
	LoginIcon,
} from "@heroicons/react/outline"
import Link from "next/link"
import { useRef } from "react"
import config from "../config"
import { useAppDispatch, useAppSelector } from "../store"
import {
	setFilterQuery,
	toggleFilterVisibility,
} from "../store/reducers/settings"

export default function Header({ showFilters = false }) {
	const spellbook = useAppSelector((state) => state.spellbook)
	const settings = useAppSelector((state) => state.settings)
	const dispatch = useAppDispatch()

	// Search timer
	let timeout = useRef<ReturnType<typeof setTimeout>>()

	const _handleSearch = (e) => {
		// Reset timeout
		clearTimeout(timeout.current)

		// After a moment from last input, dispatch search
		timeout.current = setTimeout(() => {
			dispatch(setFilterQuery(e.target.value))
		}, config.searchDelay)
	}

	return (
		<header className="sticky top-0 z-50 text-lg md:space-y-2 md:px-2">
			<div className="flex w-full justify-between bg-primaryLight-300 bg-opacity-90 px-2 py-1 shadow-md shadow-primaryLight-100 backdrop-blur-md md:rounded-b-2xl">
				<div className="inline-flex flex-col self-center py-4 px-2">
					<Link href="/">
						<a>
							<h1 className="font-bold">D&D Spellbook</h1>
						</a>
					</Link>
					{spellbook.id !== "" ? (
						<Link href={`/spellbooks/${spellbook.id}`}>
							<a className="italic hover:underline">
								<h2>{spellbook.title}</h2>
							</a>
						</Link>
					) : null}
				</div>

				<nav className="inline-block self-center">
					<ul className="space-x-2 md:space-x-4">
						{showFilters ? (
							<li className="inline-block">
								<a
									onClick={() =>
										dispatch(toggleFilterVisibility())
									}
									className={`inline-flex min-h-[2.5em] min-w-[2.5em] justify-center rounded-xl border-2 border-primaryLight-400 transition-colors hover:bg-primaryLight-400 md:px-4 ${
										settings.showFilters
											? styles.filtersActive
											: null
									}`}
								>
									<FilterIcon className="inline-block h-6 w-6 self-center align-middle" />
									<span className="ml-3 hidden self-center md:inline-block">
										Filters
									</span>
								</a>
							</li>
						) : null}
						<li className="inline-block">
							<Link href="/login">
								<a className="inline-flex min-h-[2.5em] min-w-[2.5em] justify-center rounded-xl border-2 border-primaryLight-400 transition-colors hover:bg-primaryLight-400 hover:underline md:px-4">
									<LoginIcon className="inline-block h-6 w-6 self-center align-middle" />
									<span className="ml-3 hidden self-center md:inline-block">
										Login
									</span>
								</a>
							</Link>
						</li>
						<li className="inline-block">
							<Link href="/spellbooks">
								<a className="inline-flex min-h-[2.5em] min-w-[2.5em] justify-center rounded-xl border-2 border-primaryLight-400 transition-colors hover:bg-primaryLight-400 hover:underline md:px-4">
									<BookmarkAltIcon className="inline-block h-6 w-6 self-center align-middle" />
									<span className="ml-3 hidden self-center md:inline-block">
										Spellbooks
									</span>
								</a>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			{showFilters && settings.showFilters ? (
				<div className="block w-full bg-primaryLight-300 bg-opacity-90 shadow-md shadow-primaryLight-100 backdrop-blur-md md:rounded-2xl">
					<div className="p-2">
						<input
							className="rounded-xl border-none p-2 transition-all focus:outline-none md:w-[25%] md:focus:w-[50%]"
							type="search"
							onChange={_handleSearch}
							placeholder="Search..."
						/>
					</div>
				</div>
			) : null}
		</header>
	)
}

const styles = {
	filtersActive: " bg-primaryLight-600 text-primaryLight-50",
}
