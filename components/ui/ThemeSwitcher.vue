<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggle = (): void => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    class="grid size-9 shrink-0 place-items-center rounded-[10px] border border-tokena-gray bg-white text-tokena-dark-gray transition-colors hover:bg-tokena-light-gray dark:border-tokena-dark-blue-2 dark:bg-tokena-dark-blue-1 dark:text-tokena-light-gray dark:hover:bg-tokena-dark-blue-2"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="toggle"
  >
    <!--
      The active mode is unknown during SSR, so the icon is resolved on the
      client to avoid a hydration mismatch.
    -->
    <ClientOnly>
      <UiIcon :name="isDark ? 'sun' : 'moon'" :size="20" />
      <template #fallback>
        <UiIcon name="moon" :size="20" />
      </template>
    </ClientOnly>
  </button>
</template>
