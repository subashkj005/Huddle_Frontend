/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/theme");

module.exports = {
  rippleui: {
		removeThemes: ["dark"],
	},
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "media",
  plugins: [nextui({}),
            require("rippleui"),
            require('postcss-nested'),
            require('tailwindcss'),
            require('autoprefixer'),
            require('@tailwindcss/forms'),
          ],
}