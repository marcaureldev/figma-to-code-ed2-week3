<script setup lang="ts">
import { NuxtLink } from '#components'
import type { IconName } from '~/components/ui/icons'

const props = defineProps<{
  label: string
  icon: IconName
  to?: string
  hasSublinks?: boolean
}>()

const route = useRoute()

const isActive = computed(
  () => props.to !== undefined && route.path === props.to,
)
</script>

<template>
  <component
    :is="to ? NuxtLink : 'span'"
    :to="to"
    class="flex w-full items-center gap-1 rounded-[10px] border px-2 py-3 transition-colors"
    :class="
      isActive
        ? 'border-tokena-blue bg-tokena-blue text-white dark:bg-tokena-dark-2/70'
        : 'border-transparent bg-white text-tokena-dark hover:border-tokena-gray dark:bg-tokena-dark-blue-1 dark:text-tokena-light-gray dark:hover:border-tokena-gray/30'
    "
    :aria-current="isActive ? 'page' : undefined"
    :aria-disabled="to ? undefined : 'true'"
  >
    <span class="flex min-w-0 flex-1 items-center gap-1.5">
      <UiIcon :name="icon" />
      <span
        class="min-w-0 flex-1 truncate text-xs leading-4"
        :class="isActive ? 'font-semibold' : 'font-medium'"
      >
        {{ label }}
      </span>
    </span>
    <UiIcon v-if="hasSublinks" name="chevron-down" />
  </component>
</template>
