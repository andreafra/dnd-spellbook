import Link from "next/link"
import { useContext } from "react"
import { SpellDispatch } from "../pages/_app"

export default function Header() {
  const spellDispatch = useContext(SpellDispatch)

  const _handleSearch = (e) => {
    spellDispatch({ type: "search", payload: e.target.value })
  }

  return (
    <header className="px-2 flex sticky top-0 z-50 md:mx-2 md:rounded-b-xl justify-between bg-primaryLight-300 bg-opacity-90 backdrop-blur-md shadow-md shadow-primaryLight-100">
      <h1 className="py-2 font-bold">
        <Link href="/">D&D Spellbook</Link>
      </h1>
      <div>
        <input type="search" onChange={_handleSearch} />
      </div>
      <nav className="py-2">
        <ul>
          <li>
            <Link href="/">Prepared Spells</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
