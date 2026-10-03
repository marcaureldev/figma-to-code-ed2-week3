<script setup lang="ts">
import type { NuxtError } from '#app'
// Illustrations live outside `components/`, so they are imported explicitly
// rather than picked up by Nuxt's auto-import.
import NotFound from '~/illustrations/NotFound.vue'

const props = defineProps<{ error: NuxtError }>()

const heading = computed(() =>
  props.error.statusCode === 404
    ? 'This page does not exist'
    : 'Something went wrong',
)

useHead({
  htmlAttrs: { lang: 'en' },
  title: `${props.error.statusCode ?? 500} · Tokena`,
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  meta: [{ name: 'robots', content: 'noindex' }],
})

/** The raw message can leak internals, so it is shown in dev only. */
const isDev = import.meta.dev

/** Clears the error state before routing, otherwise Nuxt keeps the page. */
const goHome = (): Promise<void> => clearError({ redirect: '/' })
</script>

<template>
  <div
    class="grid min-h-screen place-items-center bg-white px-4 py-10 dark:bg-tokena-dark-blue-1"
  >
    <div class="flex w-full max-w-md flex-col items-center text-center">
      <div class="flex items-center gap-2.5">
        <div
          class="grid size-8 shrink-0 place-items-center rounded-[10px] bg-tokena-blue/[0.22]"
        >
          <UiIcon name="tokena-mark" :size="20" class="text-tokena-blue" />
        </div>
        <p class="text-sm font-bold text-tokena-dark-2">Tokena</p>
      </div>

      <NotFound class="mt-10 w-[220px]" />

      <p
        class="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-tokena-dark-gray dark:text-tokena-gray"
      >
        Error {{ error.status ?? 500 }}
      </p>
      <h1
        class="mt-2 text-xl font-semibold text-tokena-dark dark:text-tokena-light-gray"
      >
        {{ heading }}
      </h1>

      <pre
        v-if="isDev && error.message"
        class="mt-5 max-h-40 w-full overflow-auto rounded-[10px] bg-tokena-light-gray p-3 text-left text-xs text-tokena-dark dark:bg-tokena-dark-blue-2 dark:text-tokena-light-gray"
        >{{ error.message }}</pre>

      <UiButton size="md" icon="home" class="mt-7" @click="goHome">
        Back to dashboard
      </UiButton>
    </div>
  </div>
</template>
