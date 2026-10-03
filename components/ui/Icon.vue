<script setup lang="ts">
import { icons, type IconName } from './icons'

const props = withDefaults(
  defineProps<{
    name: IconName
    size?: number | string
  }>(),
  { size: 18 },
)

const icon = computed(() => icons[props.name])
</script>

<template>
  <!--
    The glyph paints with `currentColor`, so colour comes from the parent's
    text colour and the active, hover and dark-theme states need no extra art.
  -->
  <svg
    :viewBox="icon.viewBox"
    :width="size"
    :height="size"
    fill="none"
    aria-hidden="true"
    focusable="false"
    class="shrink-0"
    v-html="icon.body"
  ></svg>
</template>
