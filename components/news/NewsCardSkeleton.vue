<script setup lang="ts">
// Mirrors NewsCard's shape so the grid does not jump once articles arrive.
</script>

<template>
  <div
    class="flex flex-col gap-2.5 rounded-xl border border-tokena-light-gray bg-white p-2.5 dark:border-tokena-gray/15 dark:bg-tokena-dark-blue-1"
  >
    <div class="flex items-center gap-2">
      <UiSkeleton class="size-8 shrink-0 rounded-full" />
      <div class="flex-1 space-y-1">
        <UiSkeleton class="h-3 w-2/3" />
        <UiSkeleton class="h-3 w-1/3" />
      </div>
    </div>
    <UiSkeleton class="aspect-[319/194] w-full" />
    <div class="space-y-1.5">
      <UiSkeleton class="h-3 w-full" />
      <UiSkeleton class="h-3 w-4/5" />
      <UiSkeleton class="h-3 w-3/5" />
    </div>
  </div>
</template>
