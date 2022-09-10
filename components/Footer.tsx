import React from "react"

export default function Footer() {
	return (
		<footer className="mx-2 mt-4 space-x-2 rounded-lg bg-primaryLight-300 p-2 text-primaryLight-600">
			<a
				className="underline"
				href="https://www.iubenda.com/privacy-policy/37495534"
				title="Privacy Policy"
			>
				Privacy Policy
			</a>
			<a
				className="underline"
				href="https://github.com/andreafra/dnd-spellbook"
				title="Source Code"
			>
				Source Code
			</a>
		</footer>
	)
}
