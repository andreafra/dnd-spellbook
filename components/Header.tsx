import Link from "next/link";
import { RiBookOpenLine } from "react-icons/ri";

export default function () {
	return (
		<header className="w-full flex justify-between">
			<h1 className="text-4xl font-extrabold text-primary-900 py-2 h-full align-baseline">
				<Link href="/">
					<a>Spells</a>
				</Link>
			</h1>
			<ul className="align-baselin">
				<li>
					<Link href="/prepared">
						<a className="inline-block p-4 text-xl">
							<RiBookOpenLine />
						</a>
					</Link>
				</li>
			</ul>
		</header>
	);
}
