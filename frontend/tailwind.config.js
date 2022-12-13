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
        'placeholder-color': '#C8C8C8',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
