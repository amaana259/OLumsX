/** @type {import('tailwindcss').Config} */
module.exports = {
  important: false,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'),
  require('@tailwindcss/forms'), require('flowbite/plugin')],
}

