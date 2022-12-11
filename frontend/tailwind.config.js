module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      'primary-bg': '#161E22',
      'primary-color': '#FFFFFF',
    },
    fontFamily: {
      default: ['Montserrat'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
