<script setup lang="ts">
withDefaults(
  defineProps<{
    /** `text` sizes itself like a line of copy; `circle` stays round. */
    variant?: 'block' | 'text' | 'circle'
  }>(),
  { variant: 'block' },
)

const SHAPES = {
  block: 'rounded-[10px]',
  text: 'h-3 rounded-full',
  circle: 'rounded-full',
} as const
</script>

<template>
  <div class="skeleton" :class="SHAPES[variant]" aria-hidden="true" />
</template>
