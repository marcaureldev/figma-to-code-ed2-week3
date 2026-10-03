// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-08-21',

  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxt/eslint'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'tokena-color-mode',
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  experimental: {
    typedPages: true,
  },

  runtimeConfig: {
    newsApiBase: 'https://cryptocurrency.cv/api/v1',
    newsRequestTimeoutMs: '10000',
    public: {
      coingeckoApiBase: 'https://api.coingecko.com/api/v3',
    },
  },
})
