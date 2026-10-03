<script setup lang="ts">
const model = defineModel<string>({ default: '' })

withDefaults(defineProps<{ placeholder?: string }>(), {
  placeholder: 'Search crypto...',
})
</script>

<template>
  <div
    class="flex h-10 items-center gap-2 rounded-[10px] border border-tokena-gray bg-white px-4 text-tokena-dark-gray focus-within:border-tokena-blue dark:border-tokena-dark-gray dark:bg-tokena-dark-blue-1 dark:focus-within:border-tokena-blue"
  >
    <UiIcon name="search" />
    <input
      v-model="model"
      type="search"
      :placeholder="placeholder"
      :aria-label="placeholder"
      class="w-full bg-transparent text-sm font-medium text-tokena-dark placeholder:text-tokena-dark-gray focus:outline-none dark:text-tokena-light-gray"
    />
  </div>
</template>
