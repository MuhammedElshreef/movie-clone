/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '7px 0px rgba(0,0,0, 0.2)'
      }
    }
  },
  plugins: [
    require('daisyui'),
    require('tw-elements/dist/plugin.cjs'),
    require('@tailwindcss/aspect-ratio')
  ]
}
