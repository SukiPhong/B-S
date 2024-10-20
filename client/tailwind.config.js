/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        primary: "#091a2b",
        main: "#005163",
        secondary: "#005163",
        success: "#2ecc71",
        info: "#34495e",
        warning: "#e67e22",
        danger: "#e74c3c",
        light: "#ecf0f1",
        dark: "#34495e",
      },
      backgroundColor: {
        main: "#005163",
        primary: "#f1f3f4"
      },
      keyframes: {
        "scale-up-center": {
          from: {
            "-webkit-transform": "scale(1)",
            "transform": "scale(1)"
          },
          to: {
            "-webkit-transform": "scale(1.3)",
            "transform": "scale(1.3)"
          }
        }
      }
      ,
      animation: {
        "scale-up-center": " scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
  mode: ' jit '
}