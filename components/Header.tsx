import { BookmarkAltIcon, FilterIcon, UserIcon } from "@heroicons/react/outline"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "../store"
import { toggleFilterVisibility } from "../store/reducers/settings"
import Filters from "./Filters"

export default function Header({ showFilters = false }) {
	const router = useRouter()
	const spellbook = useAppSelector((state) => state.spellbook)
	const settings = useAppSelector((state) => state.settings)
	const { data: session } = useSession()

	const dispatch = useAppDispatch()

	return (
		<header className="sticky top-0 z-50 mx-auto w-full bg-primaryLight-300 text-lg shadow-md shadow-primaryLight-100">
			<div className="container mx-auto flex justify-between px-2 py-2 md:px-0">
				{/* Title */}
				<div className="inline-flex flex-col self-center">
					{router.pathname.match(/\/spellbooks\/.*$/) ? (
						<h1 className="font-bold">{spellbook.title}</h1>
					) : (
						<Link href="/">
							<h1 className="font-bold">D&D Spellbook</h1>
						</Link>
					)}
				</div>
				<nav className="inline-block self-center">
					<ul className="space-x-2">
						{settings.enableFilters && (
							<li className="inline-block">
								<button
									onClick={() =>
										dispatch(toggleFilterVisibility())
									}
									className={
										"inline-flex min-h-[2.5em] min-w-[2.5em] justify-center rounded-xl border-2 border-primaryLight-400 transition-colors hover:bg-primaryLight-400 md:px-4"
									}
								>
									<span className="inline-grid h-6 w-6 content-center self-center md:mr-2">
										<FilterIcon className="h-6 w-6" />
									</span>
									<span className="hidden self-center md:inline-block">
										Filters
									</span>
								</button>
							</li>
						)}
						<li className="inline-block">
							<Link
								href="/login"
								className={`${
									router.pathname.startsWith("/login")
										? "bg-primaryLight-400"
										: ""
								} inline-flex min-h-[2.5em] min-w-[2.5em] justify-center rounded-xl border-2 border-primaryLight-400 transition-colors hover:bg-primaryLight-400 md:px-4`}
							>
								<span className="inline-grid h-6 w-6 content-center self-center md:mr-2">
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
								className={` ${
									router.pathname.match(/\/spellbooks\/?$/)
										? "bg-primaryLight-400"
										: ""
								} inline-flex min-h-[2.5em] min-w-[2.5em] justify-center rounded-xl border-2 border-primaryLight-400 transition-colors hover:bg-primaryLight-400 md:px-4`}
							>
								<span className="inline-grid h-6 w-6 content-center self-center md:mr-2">
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
