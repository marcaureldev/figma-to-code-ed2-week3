<script setup lang="ts">
import type { TrendingCoin } from '~/types/coin'

const props = defineProps<{
  trending: TrendingCoin
}>()

const coin = computed(() => props.trending.item)

/**
 * The app displays prices in USD, so read the USD change rather than one of
 * the other hundred currencies CoinGecko returns alongside it.
 */
const priceChange = computed(() => coin.value.data.price_change_percentage_24h.usd ?? 0)

const isPositive = computed(() => priceChange.value > 0)
</script>

<template>
  <div class="border p-3 xl:max-w-52 rounded-lg">
    <div class="flex space-x-3 justify-between items-start">
      <div class="flex space-x-2">
        <img :src="coin.thumb" :alt="coin.name" class="w-9 h-9 rounded-full object-cover">
        <div class="min-w-0">
          <p class="text-xs font-bold truncate">{{ coin.name }}</p>
          <p class="text-xs uppercase">{{ coin.symbol }}</p>
        </div>
      </div>
      <span
        class="flex items-center p-1 font-semibold bg-opacity-[15%] text-xs rounded-full"
        :class="isPositive ? 'bg-tokena-green text-tokena-green' : 'bg-tokena-red text-tokena-red'"
      >
        {{ priceChange.toFixed(2) }}%
        <img
          :src="isPositive ? '/icons/trade-up-icon.svg' : '/icons/trade-down-icon.svg'"
          :alt="isPositive ? 'Trending up' : 'Trending down'"
          class="w-4"
        >
      </span>
    </div>
    <div class="text-sm mt-4 text-tokena-dark-gray">
      <p class="font-bold">
        {{ coin.data.price.toFixed(2) }} <span class="uppercase">{{ coin.symbol }}</span>
      </p>
      <p>{{ coin.data.market_cap }}</p>
    </div>
  </div>
</template>
