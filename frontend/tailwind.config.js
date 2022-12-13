module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      default: ['Montserrat'],
    },
    extend: {
      colors: {
        'input-bg': '#4A565A',
        'primary-bg': '#161E22',
        'secondary-bg': '#22333B',
        'primary-color': '#FFFFFF',
        'primary-button-bg': '#C6AC8F',
        'secondary-button-bg': '#5A4B38',
        'placeholder-color': '#C8C8C8',
        'error-color': '#FF1818',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
