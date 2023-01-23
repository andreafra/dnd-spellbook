const colors = require("tailwindcss/colors")

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					"0%": { transform: "translateX(-50%)", opacity: 0 },
					"100%": { transform: "translateX(0%)", opacity: 100 },
				},
				fadeOut: {
					"0%": { transform: "translateX(0%)", opacity: 100 },
					"100%": { transform: "translateX(50%)", opacity: 0 },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.33s ease-in-out normal forwards",
				fadeOut: "fadeOut 0.33s ease-in-out normal forwards",
			},
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			primaryLight: colors.gray,
			primaryDark: colors.green,
			danger: colors.red,
			success: colors.green,
			warning: colors.yellow,
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
