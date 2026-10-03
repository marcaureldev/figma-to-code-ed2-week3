<script setup lang="ts">
// The sidebar is fixed at 240px from `lg` up, so the content is inset to match.
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-tokena-dark-blue-1">
    <LayoutSidebar />

    <div class="lg:pl-60">
      <LayoutTopNav />
      <main class="px-4 py-5 sm:px-6">
        <slot />
      </main>
    </div>

    <CoinOverviewPanel />
  </div>
</template>
