<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error.statusCode === 404)

const heading = computed(() =>
  isNotFound.value ? 'This page does not exist' : 'Something went wrong',
)

const message = computed(() =>
  isNotFound.value
    ? 'The address you opened has no page behind it. It may have moved, or the link may be mistyped.'
    : 'The app hit an unexpected error while rendering this page. Going back to the dashboard usually clears it.',
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
    <div class="flex w-full max-w-md flex-col items-center gap-6 text-center">
      <div class="flex items-center gap-3">
        <div
          class="grid size-9 shrink-0 place-items-center rounded-[10px] bg-tokena-blue/[0.22]"
        >
          <UiIcon name="tokena-mark" :size="24" class="text-tokena-blue" />
        </div>
        <p class="text-base font-bold text-tokena-dark-2">Tokena</p>
      </div>

      <div class="space-y-2">
        <p class="text-5xl font-bold leading-none text-tokena-blue">
          {{ error.statusCode ?? 500 }}
        </p>
        <h1
          class="text-xl font-semibold text-tokena-dark dark:text-tokena-light-gray"
        >
          {{ heading }}
        </h1>
        <p
          class="text-sm font-medium text-tokena-dark-gray dark:text-tokena-gray"
        >
          {{ message }}
        </p>
      </div>

      <pre
        v-if="isDev && error.message"
        class="max-h-40 w-full overflow-auto rounded-[10px] bg-tokena-light-gray p-3 text-left text-xs text-tokena-dark dark:bg-tokena-dark-blue-2 dark:text-tokena-light-gray"
        >{{ error.message }}</pre>

      <UiButton size="md" icon="home" @click="goHome">
        Back to dashboard
      </UiButton>
    </div>
  </div>
</template>
