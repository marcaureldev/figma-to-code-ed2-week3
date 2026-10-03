<script setup lang="ts">
import { NuxtLink } from '#components'
import type { IconName } from '~/components/ui/icons'

const props = defineProps<{
  label: string
  icon: IconName
  /** Omitted for the entries of the design that have no screen behind them yet. */
  to?: string
  /** Renders the disclosure chevron of the design's `with-sublinks` variant. */
  hasSublinks?: boolean
}>()

const route = useRoute()

const isActive = computed(() => props.to !== undefined && route.path === props.to)
</script>

<template>
  <component
    :is="to ? NuxtLink : 'span'"
    :to="to"
    class="flex w-full items-center gap-1 rounded-[10px] border px-2 py-3 transition-colors"
    :class="isActive
      ? 'border-tokena-blue bg-tokena-blue text-white dark:bg-tokena-dark-2/70'
      : 'border-white bg-white text-tokena-dark hover:border-tokena-gray dark:border-tokena-dark dark:bg-tokena-dark-blue-1 dark:text-tokena-light-gray dark:hover:border-tokena-gray/30'"
    :aria-current="isActive ? 'page' : undefined"
    :aria-disabled="to ? undefined : 'true'"
  >
    <span class="flex min-w-0 flex-1 items-center gap-1.5">
      <UiIcon :name="icon" />
      <span class="min-w-0 flex-1 truncate text-xs leading-4" :class="isActive ? 'font-semibold' : 'font-medium'">
        {{ label }}
      </span>
    </span>
    <UiIcon v-if="hasSublinks" name="chevron-down" />
  </component>
</template>
