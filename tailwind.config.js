/**@type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        "secondary": "hsl(0,0,0)",
        "secondary-light": "hsl(0,0%,40%)",
        "primary": "hsl(0,0%,100%)",
        "primary-dark": "hsl(0,0,80%)",
      },
      fontSize: {
        "sub": "0.9rem"
      }
    },
  },
  plugins: [],
};
