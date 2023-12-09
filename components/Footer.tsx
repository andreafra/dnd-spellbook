import { CodeIcon, DocumentIcon } from "@heroicons/react/outline"

export default function Footer() {
	return (
		<footer className="mx-2 space-y-4 py-2">
			<div className="place-content-between content-center rounded-lg bg-primaryLight-300 px-4 py-2 text-primaryLight-600 md:flex">
				<p className="inline-block py-2 align-middle">
					This website only use functional cookies, zero tracking!
				</p>
				<div className="block space-x-2 sm:inline-block">
					<a
						className="ml-auto inline-block rounded-md bg-primaryLight-100 px-4 py-2 transition-colors hover:bg-primaryLight-200"
						href="https://roll20.net/compendium/dnd5e/OGL%20License"
						title="Open Gaming License"
						rel="noreferrer"
						target="_blank"
					>
						<DocumentIcon className="mr-2 inline-block h-4 w-4" />
						OGL
					</a>
					<a
						className="ml-auto inline-block rounded-md bg-primaryLight-100 px-4 py-2 transition-colors hover:bg-primaryLight-200"
						href="https://github.com/andreafra/dnd-spellbook"
						title="Source Code"
					>
						<CodeIcon className="mr-2 inline-block h-4 w-4" />
						Source Code
					</a>
				</div>
			</div>
			<p className="text-xs text-primaryLight-400">
				WIZARDS OF THE COAST, DUNGEONS & DRAGONS, AND THEIR LOGOS ARE
				TRADEMARKS OF WIZARDS OF THE COAST LLC IN THE UNITED STATES AND
				OTHER COUNTRIES. © 2016 WIZARDS. ALL RIGHTS RESERVED.
				DNDSPELLBOOK.VERCEL.APP IS NOT AFFILIATED WITH, ENDORSED,
				SPONSORED, OR SPECIFICALLY APPROVED BY WIZARDS OF THE COAST LLC.
				DNDSPELLBOOK.VERCEL.APP MAY USE THE TRADEMARKS AND OTHER
				INTELLECTUAL PROPERTY OF WIZARDS OF THE COAST LLC, WHICH IS
				PERMITTED UNDER WIZARDS' FAN SITE POLICY. FOR EXAMPLE, DUNGEONS
				& DRAGONS® IS A TRADEMARK[S] OF WIZARDS OF THE COAST. FOR MORE
				INFORMATION ABOUT WIZARDS OF THE COAST OR ANY OF WIZARDS'
				TRADEMARKS OR OTHER INTELLECTUAL PROPERTY, PLEASE VISIT THEIR
				WEBSITE AT (WWW.WIZARDS.COM).
			</p>
		</footer>
	)
}
