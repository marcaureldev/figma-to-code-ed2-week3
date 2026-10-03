<script setup lang="ts">
// Surfaces share one treatment across the design: 12px radius and a hairline
// border that becomes a translucent light on dark.
</script>

<template>
  <div
    class="rounded-xl border border-tokena-light-gray bg-white dark:border-tokena-gray/15 dark:bg-tokena-dark-blue-1"
  >
    <slot />
  </div>
</template>
