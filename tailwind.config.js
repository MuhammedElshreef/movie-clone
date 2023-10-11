/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '7px 0px rgba(0,0,0, 0.2)'
      }
    }
  },
  plugins: []
}
