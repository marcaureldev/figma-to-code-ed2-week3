<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    {
      rel: 'preload',
      href: '/fonts/MonaSans-Variable.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
