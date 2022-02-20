const colors = require("tailwindcss/colors");

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				serif: ["Crimson Pro", "serif"],
			},
			fontSize: {
				xs: ".75rem",
				sm: ".875rem",
				tiny: ".875rem",
				base: "1.2rem",
				lg: "1.4rem",
				xl: "1.7rem",
			},
		},
		colors: {
			primary: colors.red,
			secondary: colors.orange,
			neutral: colors.neutral,
		},
	},
	plugins: [],
};
