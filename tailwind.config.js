/**@type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ["Open Sans", "Montserrat", "Raleway", "Segoe UI", "sans-serif"]
      }
    }
  },
  plugins: [],
};
