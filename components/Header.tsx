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
	const { data: session } = useSession()

	const dispatch = useAppDispatch()

	return (
		<header className="sticky top-0 z-50 mx-auto w-full bg-primaryLight-300 text-lg shadow-md shadow-primaryLight-100">
			<div className="container mx-auto flex justify-between px-2 py-2 md:px-0">
				{/* Title */}
				<div className="inline-flex flex-col self-center">
					<Link href="/">
						<h1 className="font-bold">D&D Spellbook</h1>
					</Link>
					{/* {spellbook.id !== "" ? (
						<Link
							href={`/spellbooks/${spellbook.id}`}
							className="italic hover:underline"
						>
							<h2>{spellbook.title}</h2>
						</Link>
					) : null} */}
				</div>
				<nav className="inline-block self-center">
					<ul className="space-x-2">
						{settings.enableFilters && (
							<li className="inline-block">
								<a
									onClick={() =>
										dispatch(toggleFilterVisibility())
									}
									className={`inline-flex min-h-[2.5em] min-w-[2.5em] justify-center rounded-xl border-2 border-primaryLight-400 transition-colors hover:bg-primaryLight-400 md:px-4`}
								>
									<span className="mr-2 inline-grid h-6 w-6 content-center self-center">
										<FilterIcon className="h-6 w-6" />
									</span>
									<span className="hidden self-center md:inline-block">
										Filters
									</span>
								</a>
							</li>
						)}
						<li className="inline-block">
							<Link
								href="/login"
								className="inline-flex min-h-[2.5em] min-w-[2.5em] justify-center rounded-xl border-2 border-primaryLight-400 transition-colors hover:bg-primaryLight-400 md:px-4"
							>
								<span className="mr-2 inline-grid h-6 w-6 content-center self-center">
									<UserIcon className="h-6 w-6" />
								</span>
								<span className="hidden self-center md:inline-block">
									Account
								</span>
							</Link>
						</li>
						<li className="inline-block">
							<Link
								href="/spellbooks"
								className="inline-flex min-h-[2.5em] min-w-[2.5em] justify-center rounded-xl border-2 border-primaryLight-400 transition-colors hover:bg-primaryLight-400 md:px-4"
							>
								<span className="mr-2 inline-grid h-6 w-6 content-center self-center">
									<BookmarkAltIcon className="h-6 w-6" />
								</span>
								<span className="hidden self-center md:inline-block">
									Spellbooks
								</span>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			{settings.enableFilters && settings.showFilters && <Filters />}
		</header>
	)
}
