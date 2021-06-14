const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          404: "#C0C0C0",
        },
        blueGray: {
          ...colors.blueGray,
          303: "#CCDADF",
          404: "#B0C4DE",
        },
        warmGray: {
          ...colors.warmGray,
          303: "#D8BFD8",
          404: "#BC8F8F",
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
          777: "#000080",
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
          505: "#008000",
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
      backgroundImage: (theme) => ({
        defaultBackground: "url('../images/unsplash.jpg')",
        defaultBackground_2: "url('../images/pexels-a-pasaric-small.jpg')",
        defaultBackground_3: "url('../images/pexels-j-novacek-small.jpg')",
      }),
      boxShadow: {
        inner_md: "inset 0 2px 10px 0 rgba(0, 0, 0, 0.06)",
        inner_lg: "inset 0 2px 15px 0 rgba(0, 0, 0, 0.06)",
        inner_xl: "inset 0 2px 20px 0 rgba(0, 0, 0, 0.06)",
      },
      rotate: {
        "-26.6": "-26.6deg",
        "-26": "-26deg",
        "-25": "-25deg",
        "-24": "-24deg",
        "-23": "-23deg",
      },
      screens: {
        xs: "505px",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["hover"],
      zIndex: ["hover"],
    },
  },
  plugins: [],
};
