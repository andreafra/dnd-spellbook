import { SearchIcon } from "@heroicons/react/outline"
import { PrimaryButton } from "../components/Button"
import Link from "next/link"

export default function Home() {
	return (
		<section className="flex min-h-screen">
			<div className="mx-auto self-center">
				<blockquote className="text-center text-3xl font-bold leading-10">
					A{" "}
					<span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:rounded-xl before:bg-primaryLight-500">
						<span className="relative text-primaryLight-100">
							free spellbook
						</span>
					</span>{" "}
					for Dungeons & Dragons.
				</blockquote>
				<div className="mx-auto my-24 w-fit">
					<Link href="/spells">
						<PrimaryButton
							title="Browse Spells"
							icon={<SearchIcon className="h-6 w-6" />}
						/>
					</Link>
				</div>
				<div className="mx-auto w-fit px-4 text-left">
					<h3 className="my-3 text-xl font-bold text-primaryLight-500">
						Features:
					</h3>
					<ul className="list-disc space-y-3 pl-5 marker:text-primaryLight-500">
						<li className="">
							<b className="text-primaryLight-700">
								Up to 3 free
							</b>{" "}
							spellbooks per account.
						</li>
						<li className="">
							<b className="text-primaryLight-700">Auto-save</b>{" "}
							your spellbooks
						</li>
						<li className="">
							<b className="text-primaryLight-700">
								Single sign-on
							</b>{" "}
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
			</div>
		</section>
	)
}
