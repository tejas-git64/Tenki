/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				refresh: {
					"0%": { transform: "rotate(0deg)" },
					"50%": { transform: "rotate(270deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
			},
			fontFamily: {
				primary: ["Josefin Sans"],
			},
		},
		animation: {
			refresh: "refresh 2s ease",
		},
	},
	plugins: [],
};
