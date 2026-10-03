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

    <div v-else-if="isLoading" class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <DashboardTrendingCardSkeleton v-for="index in 4" :key="index" />
    </div>

    <UiCard v-else>
      <UiEmptyState
        icon="trade-up"
        :title="hasFailed ? 'Trending is unavailable' : 'Nothing trending'"
        :description="hasFailed
          ? 'CoinGecko did not answer this one. It usually recovers within a minute.'
          : 'No coin is trending right now.'"
      />
    </UiCard>
  </section>
</template>
