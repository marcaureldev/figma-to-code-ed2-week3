<script setup lang="ts">
const { coins, isLoading, hasFailed } = useTrending()
</script>

<template>
  <section class="min-w-0 flex-1">
    <div class="mb-1.5 flex items-center justify-between gap-4">
      <h2 class="text-lg font-semibold text-tokena-dark dark:text-tokena-light-gray">Trending</h2>
      <button
        type="button"
        class="flex items-center gap-1 text-xs font-medium text-tokena-dark-gray transition-colors hover:text-tokena-blue dark:text-tokena-gray"
      >
        View more
        <UiIcon name="next-arrow" :size="12" />
      </button>
    </div>

    <div v-if="coins.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <DashboardTrendingCard v-for="coin in coins" :key="coin.item.id" :coin="coin" />
    </div>

    <UiCard v-else class="p-6 text-center text-sm text-tokena-dark-gray dark:text-tokena-gray">
      <template v-if="isLoading">Loading trending coins…</template>
      <template v-else-if="hasFailed">Trending coins are unavailable right now.</template>
      <template v-else>No trending coins to show.</template>
    </UiCard>
  </section>
</template>
