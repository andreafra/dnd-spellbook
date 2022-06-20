const colors = require("tailwindcss/colors")

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			primaryLight: colors.gray,
			primaryDark: colors.green,
			red: colors.red,
			green: colors.green,
			// Spell Schools
			// abjuration: colors.amber,
			// conjuration: colors.emerald,
			// divination: colors.red,
			// enchantment: colors.indigo,
			// evocation: colors.lime,
			// illusion: colors.cyan,
			// necromancy: colors.fuchsia,
			// transmutation: colors.orange,
		},
	},
	plugins: [],
}
