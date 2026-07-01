/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        locoxo: {
          header: '#062B52',        // header / footer (navy)
          blue: '#0E4F86',          // hero / primary brand (royal blue)
          secondary: '#1B5F97',     // medium blue
          orange: '#F59A23',        // buttons & highlights / logo orange
          'orange-dark': '#E57E00', // button hover
          bg: '#F5F7FA',            // section background
          text: '#333333',          // body text
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}