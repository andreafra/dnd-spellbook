// pages/_document.js
import { Html, Head, NextScript, Main } from "next/document";

export default function Document() {
	const FONT_FAMILY_SERIF =
		"Crimson+Pro:ital,wght@0,400;0,700;0,900;1,400;1,700";

	return (
		<Html lang="en">
			<Head>
				<link
					rel="stylesheet"
					href={`https://fonts.googleapis.com/css2?family=${FONT_FAMILY_SERIF}&display=swap`}
				/>
			</Head>
			<body className="bg-primary-50 dark:bg-neutral-900 dark:text-primary-200">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
