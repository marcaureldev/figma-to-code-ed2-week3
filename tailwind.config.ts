import type { Config } from 'tailwindcss'

/**
 * Colour and type tokens mirror the Figma variables of the Tokena design
 * system (file xZaqJcjoZbSxam7eVElefu). Keep both in sync.
 */
export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,ts,vue}',
    './illustrations/**/*.vue',
    './composables/**/*.{js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        'tokena-blue': '#006EFF',
        'tokena-dark-2': '#0065EA',
        'tokena-dark': '#1D1D1D',
        'tokena-dark-gray': '#6B7280',
        'tokena-gray': '#D1D5DB',
        'tokena-light-gray': '#F3F4F6',
        'tokena-white': '#FFFFFF',
        'tokena-green': '#01B130',
        'tokena-red': '#CB0101',
        // Dark theme surfaces
        'tokena-dark-blue-1': '#171923',
        'tokena-dark-blue-2': '#292C3B',
      },
      fontFamily: {
        sans: ['Mona Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'mona-sans': ['Mona Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // The design's xs/sm/base/lg match Tailwind's defaults; only xxs is extra.
        xxs: ['0.625rem', { lineHeight: '0.75rem' }],
      },
    },
  },
  plugins: [],
} satisfies Config
