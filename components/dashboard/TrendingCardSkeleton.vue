<script setup lang="ts">
// Mirrors TrendingCard so the row keeps its shape while the coins load.
</script>

<template>
  <div
    class="flex flex-col gap-2.5 rounded-xl border border-tokena-light-gray bg-white p-3 dark:border-tokena-gray/15 dark:bg-tokena-dark-blue-1"
  >
    <div class="flex items-center gap-1.5">
      <UiSkeleton variant="circle" class="size-8 shrink-0" />
      <div class="min-w-0 flex-1 space-y-1">
        <UiSkeleton variant="text" class="w-2/3" />
        <UiSkeleton variant="text" class="h-2 w-1/3" />
      </div>
      <UiSkeleton class="h-5 w-14 rounded-full" />
    </div>
    <div class="space-y-1">
      <UiSkeleton variant="text" class="w-1/2" />
      <UiSkeleton variant="text" class="h-2 w-2/3" />
    </div>
  </div>
</template>
