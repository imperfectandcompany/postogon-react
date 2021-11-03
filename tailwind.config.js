const colors = require('tailwindcss/colors')
const tailwindMobileConfig = require('tailwind-mobile/config');

// wrap your config with tailwindMobileConfig
module.exports = tailwindMobileConfig({
  // JIT mode should be enabled
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
      }},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-ripple')()
  ],
});
