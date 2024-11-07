/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    fontFamily: {
      'mona-sans': ['Mona-Sans', 'sans-serif']
    },
    extend: {
      colors: {
        'tokena-blue': '#0065EA',
        'tokena-dark-2': '#006EFF',
        'tokena-dark-gray': '#6B7280',
        'tokena-green': '#01B130',
        'tokena-gray': '#D1D5DB',
        'tokena-dark': '#1D1D1D',
        'tokena-dark-gray': '#6B7280',
        'tokena-red': '#CB0101',
      },
      backgroundImage: {
        'avatar-john-icon': 'url(/icons/avatar-john-icon.svg)',
      },
    },
  },
  plugins: [],
}