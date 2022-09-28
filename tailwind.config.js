/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './node_modules/flowbite-react/**/*.js',
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        medieval: [ 'MedievalSharp', 'Cursive' ],
        roboto: [ 'Roboto', 'sans-serif' ],
        raleway: [ 'Raleway', 'sans-serif' ]
      },
      spacing: {
        '10vh': '10vh'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
