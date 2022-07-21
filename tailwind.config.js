/**@type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "primary-dark": "#dedede",
        "primary": "#efefef",
        "primary-light": "#fff",
        "secondary-dark" : "#323232",
        "secondary" : "#363636",
        "secondary-light" : "#3D3D3D",
      },
      textColor: {
        "primary": "#000",
        "secondary": "#fff"
      }
    }
  },
  plugins: [],
};
