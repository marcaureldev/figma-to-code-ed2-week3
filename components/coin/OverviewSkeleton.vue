<script setup lang="ts">
// Mirrors OverviewContent so the dialog does not resize once the coin loads.
</script>

<template>
  <div class="mt-6 space-y-6">
    <UiSkeleton class="h-[186px] w-full" />

    <div class="flex items-center justify-between gap-4">
      <div class="flex min-w-0 flex-1 items-center gap-1.5">
        <UiSkeleton variant="circle" class="size-8 shrink-0" />
        <UiSkeleton variant="text" class="h-4 w-40" />
      </div>
      <UiSkeleton variant="text" class="h-4 w-24" />
    </div>

    <div class="space-y-2.5">
      <div v-for="index in 5" :key="index" class="flex items-center justify-between gap-4">
        <UiSkeleton variant="text" class="h-4" :class="index === 1 ? 'w-40' : 'w-32'" />
        <UiSkeleton
          variant="text"
          class="h-4"
          :class="index === 1 ? 'w-16 rounded-full' : 'w-28'"
        />
      </div>
    </div>

    <div class="space-y-2">
      <UiSkeleton variant="text" class="h-4 w-24" />
      <div class="space-y-1.5">
        <UiSkeleton variant="text" class="w-full" />
        <UiSkeleton variant="text" class="w-full" />
        <UiSkeleton variant="text" class="w-4/5" />
      </div>
    </div>

    <UiSkeleton class="h-10 w-full" />
  </div>
</template>
