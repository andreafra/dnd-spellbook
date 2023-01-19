import {
	BookmarkAltIcon,
	FilterIcon,
	LoginIcon,
	UserIcon,
} from "@heroicons/react/outline"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "../store"
import { toggleFilterVisibility } from "../store/reducers/settings"
import Filters from "./Filters"

export default function Header({ showFilters = false }) {
	const spellbook = useAppSelector((state) => state.spellbook)
	const settings = useAppSelector((state) => state.settings)
	const dispatch = useAppDispatch()
	const { data: session } = useSession()

	return (
		<header className="sticky top-0 z-50 text-lg md:space-y-2 md:px-2">
			<div className="flex w-full justify-between bg-primaryLight-300 bg-opacity-90 px-2 py-1 shadow-md shadow-primaryLight-100 backdrop-blur-md md:rounded-b-2xl">
				<div className="inline-flex flex-col self-center py-4 px-2">
					<Link href="/">
						<h1 className="font-bold">D&D Spellbook</h1>
					</Link>
					{spellbook.id !== "" ? (
						<Link
							href={`/spellbooks/${spellbook.id}`}
							className="italic hover:underline"
						>
							<h2>{spellbook.title}</h2>
						</Link>
					) : null}
				</div>

				<nav className="inline-block self-center">
					<ul className="space-x-2">
						{showFilters && (
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
						)}
						<li className="inline-block">
							<Link
								href="/login"
								className="inline-flex min-h-[2.5em] min-w-[2.5em] justify-center rounded-xl border-2 border-primaryLight-400 transition-colors hover:bg-primaryLight-400 hover:underline md:px-4"
							>
								{session ? (
									<>
										<UserIcon className="inline-block h-6 w-6 self-center align-middle" />
										<span className="ml-3 hidden self-center md:inline-block">
											Account
										</span>
									</>
								) : (
									<>
										<LoginIcon className="inline-block h-6 w-6 self-center align-middle" />
										<span className="ml-3 hidden self-center md:inline-block">
											Login
										</span>
									</>
								)}
							</Link>
						</li>
						<li className="inline-block">
							<Link
								href="/spellbooks"
								className="inline-flex min-h-[2.5em] min-w-[2.5em] justify-center rounded-xl border-2 border-primaryLight-400 transition-colors hover:bg-primaryLight-400 hover:underline md:px-4"
							>
								<BookmarkAltIcon className="inline-block h-6 w-6 self-center align-middle" />
								<span className="ml-3 hidden self-center md:inline-block">
									Spellbooks
								</span>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<Filters show={showFilters && settings.showFilters} />
		</header>
	)
}

const styles = {
	filtersActive: " bg-primaryLight-600 text-primaryLight-50",
}
