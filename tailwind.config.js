/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FFC43A", // Mango Yellow
          light: "#FFD96A",
        },
        secondary: {
          DEFAULT: "#6DBE45", // Fresh Green
        },
        accent: {
          DEFAULT: "#FF7A1A", // Deep Orange
        },
        foreground: {
          DEFAULT: "#222", // Soft Black
        },
        background: {
          DEFAULT: "#F8F8F8", // Light Background
        },
        card: {
          DEFAULT: "#FFF", // White
        },
        gradient: {
          left: "#E6F9F0", // Soft Green
          right: "#FDE6F3", // Soft Pink
        },
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "Montserrat", "ui-sans-serif", "system-ui"],
      },
      height: {
        "header-height": "var(--header-height)",
      },
    },
  },
  plugins: [],
};
