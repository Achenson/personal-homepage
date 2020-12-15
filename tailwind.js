const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blueGray: colors.blueGray,
        warmGray: colors.warmGray,
        orange: colors.orange,
        yellow: colors.yellow,
        amber: colors.amber,
        lime: colors.lime,
        green: colors.green,
        emarald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        lightBlue: colors.lightBlue,
        purple: colors.purple,
        violet: colors.violet,
        fuchsia: colors.fuchsia,
        rose: colors.rose,
      }
    },
  },
  variants: {
    extend: {

    },
  },
  plugins: [],
}
