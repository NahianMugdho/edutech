/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Berlin Sans FB Demi', 'sans-serif'], // Custom font
      },
    },
  },
  plugins: [require('daisyui'),],
   daisyui: {
    themes: ["light", "dark", "synthwave","retro"], // Ensure "synthwave" is available
  },
}