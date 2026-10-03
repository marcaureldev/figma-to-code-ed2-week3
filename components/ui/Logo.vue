<script setup lang="ts">
// The mark keeps its brand blue in both themes, so it is not themed here.
</script>

<template>
  <div class="flex w-full items-center gap-3 rounded-[10px] bg-tokena-blue/[0.07] px-4 py-3">
    <div class="grid size-9 shrink-0 place-items-center rounded-[10px] bg-tokena-blue/[0.22]">
      <UiIcon name="tokena-mark" :size="24" class="text-tokena-blue" />
    </div>
    <div class="min-w-0 flex-1">
      <p class="text-xs font-bold leading-4 text-tokena-dark-2">Tokena</p>
      <p class="text-xxs font-medium text-tokena-blue">Finance app</p>
    </div>
  </div>
</template>
