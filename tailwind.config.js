/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium monochrome theme — white surfaces, black ink.
        locoxo: {
          header: '#000000',        // header / footer (black)
          blue: '#0A0A0A',          // hero / dark surfaces (near-black)
          secondary: '#111111',     // category bar (near-black)
          orange: '#111111',        // buttons & accents (black)
          'orange-dark': '#2B2B2B', // button hover
          bg: '#FFFFFF',            // section background (white)
          text: '#1A1A1A',          // body text (soft black)
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