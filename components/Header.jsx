import Link from "next/link"
import { useRef } from "react"
import { useContext } from "react"
import { SpellDispatch } from "../pages/_app"

export default function Header() {
  const spellDispatch = useContext(SpellDispatch)

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

  return (
    <header className="md:px-2 text-lg sticky top-0 z-50 md:space-y-2">
      <div className="w-full flex justify-between bg-primaryLight-300 bg-opacity-90 backdrop-blur-md shadow-md shadow-primaryLight-100 md:rounded-b-2xl">
        <h1 className="p-2 pl-4 font-bold">
          <Link href="/">D&D Spellbook</Link>
        </h1>
        <nav className="p-2">
          <ul>
            <li>
              <Link href="/">Prepared Spells</Link>
            </li>
          </ul>
        </nav>
      </div>
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
    </header>
  )
}
