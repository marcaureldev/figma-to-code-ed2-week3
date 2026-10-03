// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-08-21',

  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],

  // Point the Tailwind module at our stylesheet so it does not inject a second,
  // default one. It handles registering the file, so `css:` is not needed.
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  // `classSuffix: ''` makes the module toggle a plain `dark` class on <html>,
  // which is what Tailwind's `darkMode: 'class'` strategy expects.
  colorMode: {
    classSuffix: '',
    // Follow the operating system on a first visit; a manual choice is
    // remembered from then on. `fallback` covers browsers that report nothing.
    preference: 'system',
    fallback: 'light',
    storageKey: 'tokena-color-mode',
  },

  typescript: {
    strict: true,
    // Checked on demand via `pnpm typecheck` rather than on every build.
    typeCheck: false,
  },

  experimental: {
    typedPages: true,
  },

  /**
   * API endpoints. Every value is overridable at runtime through the matching
   * NUXT_* environment variable, so no base URL is pinned into the bundle.
   */
  runtimeConfig: {
    // Server-only: the news feed is proxied, never called from the browser.
    newsApiBase: 'https://cryptocurrency.cv/api/v1',
    newsRequestTimeoutMs: '10000',
    public: {
      coingeckoApiBase: 'https://api.coingecko.com/api/v3',
    },
  },
})
