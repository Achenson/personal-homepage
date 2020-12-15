const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blueGray: colors.blueGray,
        warmGray: colors.warmGray,
        orange: {
          ...colors.orange,
          440: "#FF6347",
          444: "#FFA500",
          660: "#FF4500",
        },
        red: {
          ...colors.red,
          440: "#E9967A",
          660: "#FF0000",
        },
        blue: {
          ...colors.blue,
          770: "#0000FF",
          777: "#0000CD",
          707: "#000080"
        },
        yellow: {
          ...colors.yellow,
          330: "#FFFF00",
          333: "#FFD700",
        },
        amber: colors.amber,
        lime: colors.lime,
        green: {
          ...colors.green,
          330: "#9ACD32"

        },
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        lightBlue: colors.lightBlue,
        purple: colors.purple,
        violet: colors.violet,
        fuchsia: colors.fuchsia,
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
