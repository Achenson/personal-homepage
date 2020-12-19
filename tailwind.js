const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          404: "#C0C0C0"
        },
        blueGray: {
        ...colors.blueGray,
        303: "#CCDADF"
        },
        warmGray: {
        ...colors.warmGray,
        303: "#D8BFD8",
        404: "#BC8F8F"
        }, 
        orange: {
          ...colors.orange,
          404: "#FF6347",
          // 444: "#FFA500",
          606: "#FF4500",
        },
        red: {
          ...colors.red,
          404: "#E9967A",
          606: "#FF0000",
        },
        blue: {
          ...colors.blue,
          // 1
          707: "#0000FF", 
          // 2
          770: "#0000CD",
          // 3
          777: "#000080"
        },
        yellow: {
          ...colors.yellow,
          303: "#FFFF00",
          330: "#FFD700",
        },
        amber: colors.amber,
        lime: colors.lime,
        green: {
          ...colors.green,
          303: "#9ACD32",
          505: "#008000"

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
