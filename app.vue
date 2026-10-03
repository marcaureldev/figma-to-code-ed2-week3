<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' },
  titleTemplate: (title) => (title ? title : 'Tokena — Finance app'),
  link: [
    // An SVG mark stays sharp at every size browsers ask for.
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'preload',
      href: '/fonts/MonaSans-Variable.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
  ],
  meta: [
    { name: 'theme-color', content: '#006EFF' },
    {
      name: 'description',
      content:
        'Track cryptocurrency prices, market capitalisation and the latest crypto news.',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
