/**@type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "primary-dark": "hsl(0,0%,87%)",
        "primary": "hsl(0,0%,94%)",
        "primary-light": "hsl(0,0%,100%)",
        "secondary-dark" : "hsl(0,0%,17%)",
        "secondary" : "hsl(0,0%,21%)",
        "secondary-light" : "hsl(0,0%,24%)",
        "accent": "#001233",
        "accent-hover": "#000E29",
      },accentColor: {
        "primary": "hsl(0,0%,85%)",
        "secondary" : "hsl(0,0%,15%)",
      },
      borderColor: {
        "primary": "hsl(0,0%,87%)",
        "secondary" : "hsl(0,0%,17%)",
      },
      textColor: {
        "primary": "#000",
        "secondary": "#fff",
        "accent": "hsl(0,0%,32%)",
        "secondary-accent": "hsl(0,0%,68%)",
      },
      fontSize: {
        "xs": '0.75rem'
      }
    }
  },
  plugins: [],
};
