module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#E17724",
          light: "#fb882d",
          lighter: "#ff9946",
          dark: "#b5611f",
          text: "#FFFFFF",
          textDarker: "#999999",
          blue: "#3570AA",
          blueLighter: "#4187cc",
          green: "#429303",
          greenLighter: "#53b804",
        },
        secondary: {
          default: "#3a3b3c",
          light: "#7a7070",
        },
        tertiary: {
          default: "#18191A",
          dark: "#1e1f20",
          light: "#1B1C1E",
        },
        quaternary: {
          default: "#353232",
          dark: "#252225",
          light: "#7f6116",
          lighter: "#3c3b3b",
        },
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
        body: ["Inter"],
        bodyGeo: ["bpgarial"],
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
