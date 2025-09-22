/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "ocean-blue": {
          50: "#7AD1DD",
          100: "#5FCCDB",
          200: "#44CADC",
          300: "#2AC9DE",
          400: "#1AC2D9",
          500: "#11B7CD",
          600: "#09ADC3",
          700: "#0E99AC",
          800: "#128797",
          900: "#147885",
        },
        light: {
          50: "#F0F3FB",
          100: "#FDFDFD",
          200: "#FBFBFB",
          300: "#F9F9F9",
        },
        dark: {
          50: "#1E1E1E",
          100: "#2C2C2C",
          200: "#3A3A3A",
          300: "#4A4A4A",
          400: "#5A5A5A",
        },
        "bright-pink": {
          50: "#F0BBDD",
          100: "#ED9BCF",
          200: "#EC7CC3",
          300: "#ED5DB8",
          400: "#F13EAF",
          500: "#F71FA7",
          600: "#FF00A1",
          700: "#E00890",
          800: "#C50E82",
          900: "#AD1374",
        },
      },
      fontFamily: {
        sans: ['"Poppins"', "ui-sans-serif", "system-ui"],
        serif: ['"Merriweather"', "ui-serif", "Georgia"],
        mono: ['"Fira Code"', "ui-monospace", "SFMono-Regular"],
      },
    },
  },
  plugins: [],
};
