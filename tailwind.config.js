module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        landing: {
          orange: "#E17724",
          orangeLight: "#f6740e",
          primaryLight: "#3a3b3c",
          primaryBorder: "#7a7070",
          bg: "#18191A",
          bgSecondary: "#292a2b",
          bgTertiary: "#1B1C1E",
        },
      },
      screens: {
        sm: "580px",
        md: "768px",
        lg: "976px",
        xl: "1340px",
      },
      fontFamily: {
        inter: ['"Inter"'],
        bpg_arial: ['"bpgarial"'],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active", "focus", "group-focus"],
      borderWidth: ["hover", "focus", "active"],
      display: ["group-hover", "group-focus"],
      pointerEvents: ["hover", "focus"],
    },
  },
  plugins: [],
};
