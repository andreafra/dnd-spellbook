// type Class =
// 	| "BARBARIAN"
// 	| "BARD"
// 	| "CLERIC"
// 	| "DRUID"
// 	| "PALADIN"
// 	| "RANGER"
// 	| "SORCERCER"
// 	| "WARLOCK"
// 	| "WIZARD";

import { UIEventHandler, useState } from "react";

interface Spell {
	readonly name: string;
	readonly desc: string;
	readonly page: string;
	readonly range: string;
	readonly components: string;
	readonly material: string;
	readonly ritual: string;
	readonly duration: string;
	readonly concentration: string;
	readonly casting_time: string;
	readonly level: string;
	readonly school: string;
	readonly class: string;
}

export default function (props: { spell: Spell }) {
	let { spell } = props;

	const [isDescScrollEnd, setDescScrollEnd] = useState(false);
	const [isDescScrollStart, setDescScrollStart] = useState(true);

	const _handleDescScroll = (ev) => {
		setDescScrollEnd(ev.target.scrollTop == ev.target.scrollTopMax);
		setDescScrollStart(ev.target.scrollTop == 0);
	};

	return (
		<div className="p-4 text-base block border-2 border-primary-800 rounded-lg">
			<h3 className="font-bold text-lg tracking-tighter text-primary-800 capitalize small-caps mb-0">
				{spell.name}
			</h3>
			<p className="italic">
				{spell.level !== "Cantrip"
					? `${spell.level} ${spell.school.toLowerCase()}`
					: `${spell.school} cantrip`}
				{spell.ritual != "no" ? " (ritual)" : null}
			</p>
			<div className="leading-6">
				<p>
					<b>Casting Time:</b> {spell.casting_time}
				</p>
				<p>
					<b>Range:</b> {spell.range}
				</p>
				<p className="-indent-4 pl-4">
					<b>Components:</b> {spell.components}{" "}
					{spell.material
						? `(${spell.material.toLowerCase()})`
						: null}
				</p>
				<p>
					<b>Duration:</b>{" "}
					{spell.concentration != "no" ? "Concentration, " : null}
					{spell.duration.toLowerCase()}
				</p>
			</div>
			<div className="relative">
				<div
					hidden={isDescScrollStart}
					className="h-8 top-0 w-full bg-gradient-to-b from-primary-50 dark:from-neutral-900 absolute pointer-events-none"
				></div>
				<div
					className="text-hyphen overflow-y-scroll max-h-64 leading-6 paragraph-indent"
					dangerouslySetInnerHTML={{ __html: spell.desc }}
					onScroll={_handleDescScroll}
				></div>
				<div
					hidden={isDescScrollEnd}
					className="h-8 bottom-0 w-full bg-gradient-to-t from-primary-50 dark:from-neutral-900 absolute pointer-events-none"
				></div>
			</div>
			<p className="text-right">
				{spell.class.split(",").map((v) => (
					<span className="border">{v}</span>
				))}
			</p>
			<p className="text-right italic">[{spell.page}]</p>
		</div>
	);
}
