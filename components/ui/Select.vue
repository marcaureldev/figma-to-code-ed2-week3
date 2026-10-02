<script setup lang="ts">
export interface SelectOption {
  label: string
  value: string
}

const model = defineModel<string>({ default: '' })

defineProps<{
  options: SelectOption[]
  placeholder: string
}>()
</script>

<template>
  <!--
    A native <select> keeps keyboard and screen-reader behaviour for free; the
    chevron is drawn on top because browsers will not style the built-in one.
  -->
  <div
    class="relative flex h-10 items-center rounded-[10px] border border-tokena-gray bg-white text-tokena-dark-gray focus-within:border-tokena-blue dark:border-tokena-dark-gray dark:bg-tokena-dark-blue-1 dark:focus-within:border-tokena-blue"
  >
    <select
      v-model="model"
      :aria-label="placeholder"
      class="w-full appearance-none bg-transparent px-4 pr-10 text-sm font-medium text-tokena-dark focus:outline-none dark:text-tokena-light-gray"
    >
      <option value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <UiIcon name="chevron-down" :size="20" class="pointer-events-none absolute right-3" />
  </div>
</template>
