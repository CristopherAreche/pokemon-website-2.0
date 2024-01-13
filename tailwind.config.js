/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        wallpaper: "url('/src/images/wallpaper.jpg')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
