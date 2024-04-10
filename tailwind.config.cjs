
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors : {
        // set themes colors
        dark :{
          primary : "#EE6C4D",
          secondary :{
            50 : "#d1d5db" ,
            100: "#1E1F25",
            900: "#131517"
          }
        },

        light :{
          primary : "#343a40",
          secondary :{
            50 : "#6b7280",
            100: "#FFF",
            900: "#ebeff2"
          }
        },
        
        //set themes colors for clases
        secondary : {
          50 : "var(--color-secondary-50)",
          100 : "var(--color-secondary-100)",
          900 : "var(--color-secondary-900)"
        },

        primary : "var(--color-primary)",

      },
    },
  },
  plugins: [],
}