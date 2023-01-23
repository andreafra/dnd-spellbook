import { SearchIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { PrimaryButton } from "../components/Button"
import SpellCard from "../components/SpellCard"
import SpellList from "../components/SpellList"
import { useAppSelector } from "../store"

export default function Home() {
	const [showSpells, setShowSpells] = useState(false)

	if (showSpells)
		return (
			<section>
				<SpellList />
			</section>
		)
	return (
		<section className="block">
			<blockquote className="mt-36 mb-24 text-center text-3xl font-bold leading-10">
				A{" "}
				<span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:rounded-xl before:bg-primaryLight-500">
					<span className="relative text-primaryLight-100">
						free spellbook
					</span>
				</span>{" "}
				for Dungeons & Dragons.
			</blockquote>
			<div className="mx-auto my-24 w-fit">
				<PrimaryButton
					title="Browse Spells"
					onClick={() => setShowSpells(true)}
					icon={<SearchIcon className="h-6 w-6" />}
				/>
			</div>
			<div className="mx-auto mt-12 w-fit px-4 text-left">
				<h3 className="my-3 text-xl font-bold text-primaryLight-500">
					Features:
				</h3>
				<ul className="list-disc space-y-3 pl-5 marker:text-primaryLight-500">
					<li className="">
						<b className="text-primaryLight-700">Up to 3 free</b>{" "}
						spellbooks per account.
					</li>
					<li className="">
						<b className="text-primaryLight-700">Auto-save</b> your
						spellbooks
					</li>
					<li className="">
						<b className="text-primaryLight-700">Single sign-on</b>{" "}
						with Google or Discord
					</li>
					<li className="">
						<b className="text-primaryLight-700">
							Privacy-friendly:
						</b>{" "}
						no data is collected
					</li>
				</ul>
			</div>
		</section>
	)
}
