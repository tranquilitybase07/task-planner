/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"], // Add Outfit as the primary font
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["forest"], // Set the theme to "corporate"
  },
  extend: {
    animation: {
      fadeIn: "fadeIn 0.5s ease-in-out",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
    },
  },
};
