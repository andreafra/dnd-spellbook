import Link from "next/link"
import { useRef } from "react"
import { useContext } from "react"
import { Dispatchers } from "../stores/Dispatcher"

export default function Header({ showFilters = false }) {
	const { spellDispatch } = useContext(Dispatchers)

	// Search timer
	const timeout = useRef(0)

	const _handleSearch = (e) => {
		// Reset timeout
		clearTimeout(timeout)

		// After a moment from last input, dispatch search
		timeout = setTimeout(() => {
			spellDispatch({ type: "search", payload: e.target.value })
		}, 500)
	}

	// Nav
	const navLinks = [
		{ label: "Login", path: "/login" },
		{ label: "Spellbooks", path: "/spellbooks" },
	]

	return (
		<header className="md:px-2 text-lg sticky top-0 z-50 md:space-y-2">
			<div className="w-full flex justify-between bg-primaryLight-300 bg-opacity-90 backdrop-blur-md shadow-md shadow-primaryLight-100 md:rounded-b-2xl">
				<h1 className="p-4 pl-4 font-bold">
					<Link href="/">D&D Spellbook</Link>
				</h1>
				<nav className="align-middle">
					<ul className="space-x-4">
						{navLinks.map((a, index) => (
							<li className="inline-block p-4" key={index}>
								<Link href={a.path}>
									<a className="hover:underline">{a.label}</a>
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
			{showFilters ? (
				<div className="block w-full bg-primaryLight-300 bg-opacity-90 backdrop-blur-md shadow-md shadow-primaryLight-100 md:rounded-2xl">
					<div className="p-2">
						<input
							className="p-2 border-none rounded-xl focus:outline-none"
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
