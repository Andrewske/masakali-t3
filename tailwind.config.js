/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'purple': '#372137',
        'white': '#ffffff',
        'gray': '#f2f2f2',
        'light-purple-5': 'rgba(163, 143, 159, 0.5)',
        'light-purple-7': 'rgba(163, 143, 159, 0.7)'

      },
      boxShadow: {
        'error': 'rgba(255, 0, 0, 0.5) 0px 1px 4px, rgba(255, 0, 0, 0.5) 0px 0px 0px 3px',
        'light-purple': 'rgba(163, 143, 159, 0.5) 0px 1px 2px, rgba(163, 143, 159, 0.5) 0px 0px 0px 2px',
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'serif': ['"Roboto Slab"', 'serif'],
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
        'baskerville': ['var(--font-baskerville)', 'serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}