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
    preference: 'light',
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
})
