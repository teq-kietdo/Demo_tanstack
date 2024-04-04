/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    keyframes: {
      spinner: {
        to: {
          transform: "rotate(360deg)",
        },
      },
    },
    animation: {
      spinner: "spinner 1s forwards infinite linear",
    },
  },
  plugins: [],
}