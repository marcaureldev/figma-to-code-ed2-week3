<script setup lang="ts">
type BadgeTone = 'positive' | 'negative' | 'neutral'

const props = withDefaults(
  defineProps<{
    tone?: BadgeTone
    /** Shows the matching trend arrow, as the trending cards do. */
    withTrendIcon?: boolean
  }>(),
  { tone: 'neutral', withTrendIcon: false },
)

// The design tints the background to 15% and keeps the label at full strength.
const TONES: Record<BadgeTone, string> = {
  positive: 'bg-tokena-green/15 text-tokena-green',
  negative: 'bg-tokena-red/15 text-tokena-red',
  neutral: 'bg-tokena-light-gray text-tokena-dark dark:bg-tokena-dark-blue-2 dark:text-tokena-gray',
}

const toneClasses = computed(() => TONES[props.tone])
</script>

<template>
  <span
    class="inline-flex items-center gap-[3px] whitespace-nowrap rounded-full px-1.5 py-1 text-xxs font-semibold"
    :class="toneClasses"
  >
    <slot />
    <UiIcon
      v-if="withTrendIcon && tone !== 'neutral'"
      :name="tone === 'positive' ? 'trade-up' : 'trade-down'"
      :size="12"
    />
  </span>
</template>
