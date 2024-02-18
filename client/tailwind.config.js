/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      spacing: {
        '60%': '60%',
      },
      padding: {
        '25%': '25%',
        '15%': '15%',
        '5%': '5%',
        '30%':'30%',
        '20%':'20%',
        '2%':'2%',
        '2.5%':'2.5%',
        '10%':'10%',
        
      },
      margin: {
        '5%': '5%',
        '10%':'10%',
        '20%':'20%',
        
      } 
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}