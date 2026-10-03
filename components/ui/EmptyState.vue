<script setup lang="ts">
import type { IconName } from '~/components/ui/icons'

withDefaults(
  defineProps<{
    icon?: IconName
    title: string
    description?: string
    /** Label of the retry action. Omit it to show no button. */
    actionLabel?: string
  }>(),
  { icon: 'search' },
)

defineEmits<{ action: [] }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
    <div
      class="grid size-12 place-items-center rounded-full bg-tokena-light-gray text-tokena-dark-gray dark:bg-tokena-dark-blue-2 dark:text-tokena-gray"
    >
      <UiIcon :name="icon" :size="22" />
    </div>

    <div class="space-y-1">
      <p class="text-sm font-semibold text-tokena-dark dark:text-tokena-light-gray">{{ title }}</p>
      <p
        v-if="description"
        class="max-w-sm text-xs font-medium text-tokena-dark-gray dark:text-tokena-gray"
      >
        {{ description }}
      </p>
    </div>

    <UiButton v-if="actionLabel" variant="outline" class="mt-1" @click="$emit('action')">
      {{ actionLabel }}
    </UiButton>
  </div>
</template>
