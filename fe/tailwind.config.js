/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        terracotta: "#B85042",
        teraActive: "#9c4034",
        beige: "#E7E8D1",
        mutedTeal: "#A7BEAE",
      },
    },
  },
  plugins: [],
};
