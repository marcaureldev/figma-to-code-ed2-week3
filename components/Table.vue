<script setup lang="ts">
const { coins, isLoading, hasFailed } = useMarkets()

const ITEMS_PER_PAGE = 10

/** How many pages to show on each side of the current one. */
const PAGE_WINDOW = 2

const page = ref(1)

const totalPages = computed(() => Math.ceil(coins.value.length / ITEMS_PER_PAGE))

const visibleCoins = computed(() => {
  const start = ITEMS_PER_PAGE * (page.value - 1)
  return coins.value.slice(start, start + ITEMS_PER_PAGE)
})

const ELLIPSIS = '...' as const

type PageItem = number | typeof ELLIPSIS

/** First page, last page, a window around the current one, ellipses between. */
const visiblePages = computed<PageItem[]>(() => {
  if (totalPages.value <= 1) return []

  const pages: PageItem[] = [1]

  if (page.value > PAGE_WINDOW + 2) pages.push(ELLIPSIS)

  const start = Math.max(2, page.value - PAGE_WINDOW)
  const end = Math.min(totalPages.value - 1, page.value + PAGE_WINDOW)

  for (let index = start; index <= end; index += 1) pages.push(index)

  if (page.value < totalPages.value - PAGE_WINDOW - 1) pages.push(ELLIPSIS)

  pages.push(totalPages.value)

  return pages
})

const goTo = (target: PageItem): void => {
  if (target === ELLIPSIS) return
  page.value = target
}

const previous = (): void => {
  if (page.value > 1) page.value -= 1
}

const next = (): void => {
  if (page.value < totalPages.value) page.value += 1
}

// Coins arrive after the first render; keep the page index in range if the
// list ever comes back shorter than where the reader had navigated to.
watch(totalPages, (count) => {
  if (count > 0 && page.value > count) page.value = count
})

const sparklineOptions = (priceChange: number) => ({
  chart: {
    type: 'line' as const,
    zoom: { enabled: false },
    toolbar: { show: false },
    sparkline: { enabled: true },
  },
  grid: { show: false },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  stroke: { curve: 'smooth' as const, width: 1.25 },
  tooltip: { enabled: false },
  colors: [priceChange >= 0 ? '#01B130' : '#CB0101'],
})

const sparklineSeries = (prices: number[]) => [{ name: 'Price', data: prices }]

const formatUsd = (value: number): string => `$${value.toLocaleString('en-US')}`
</script>

<template>
  <div>
    <div class="border-2 rounded-lg">
      <div class="flex justify-between items-center p-4">
        <p>Market</p>
        <img src="/icons/market-options-icons.svg" alt="Options">
      </div>

      <div class="w-full overflow-x-auto">
        <table v-if="visibleCoins.length" class="w-full">
          <thead class="bg-tokena-gray text-tokena-dark">
            <tr class="whitespace-nowrap">
              <td class="px-4 py-3" />
              <td class="px-4 py-3">#</td>
              <td class="px-4 py-3">Coins</td>
              <td class="px-4 py-3">Price</td>
              <td class="px-4 py-3">24h</td>
              <td class="px-4 py-3">24h Volume</td>
              <td class="px-4 py-3">Market Cap</td>
              <td class="px-4 py-3">Last 7 days</td>
            </tr>
          </thead>
          <tbody class="text-sm whitespace-nowrap">
            <tr v-for="coin in visibleCoins" :key="coin.id" class="bg-white border-b hover:bg-gray-100">
              <td class="px-4 py-3" style="min-width: 50px;">
                <img src="/icons/star-icon.svg" alt="Add to favourites">
              </td>
              <td class="px-4 py-3">{{ coin.market_cap_rank }}</td>
              <td class="text-sm font-bold p-1 whitespace-nowrap max-w-xs truncate">
                <div class="flex items-center space-x-1">
                  <img :src="coin.image" :alt="coin.name" class="w-6 h-6">
                  <p class="flex items-center">
                    {{ coin.name }}-<span class="uppercase">{{ coin.symbol }}</span>
                  </p>
                </div>
              </td>
              <td class="py-3 p-2">{{ formatUsd(coin.current_price) }}</td>
              <td class="py-3 max-w-2 font-semibold text-xs text-center">
                <span
                  class="p-1 rounded-full text-xs font-semibold bg-opacity-[15%] max-w-2"
                  :class="coin.price_change_percentage_24h < 0
                    ? 'bg-tokena-red text-tokena-red'
                    : 'bg-tokena-green text-tokena-green'"
                >
                  {{ coin.price_change_percentage_24h.toFixed(2) }}%
                </span>
              </td>
              <td class="py-3">{{ formatUsd(coin.total_volume) }}</td>
              <td class="py-3">{{ formatUsd(coin.market_cap) }}</td>
              <td class="px-4 py-3">
                <ClientOnly>
                  <apexchart
                    height="50px"
                    width="150px"
                    type="line"
                    :options="sparklineOptions(coin.price_change_percentage_24h)"
                    :series="sparklineSeries(coin.sparkline_in_7d.price)"
                  />
                </ClientOnly>
              </td>
            </tr>
          </tbody>
        </table>

        <p v-else class="flex justify-center items-center w-full p-8 text-sm text-tokena-dark-gray">
          <template v-if="isLoading">Loading the market…</template>
          <template v-else-if="hasFailed">The market data is unavailable right now. Please try again shortly.</template>
          <template v-else>No cryptocurrency to display at the moment.</template>
        </p>
      </div>
    </div>

    <div v-if="visiblePages.length" class="flex space-x-2 justify-center items-center mt-4">
      <button type="button" class="flex items-center rounded-lg px-4 py-2" aria-label="Previous page" @click="previous">
        <img src="/icons/previous-arrow-icon.svg" alt="">
      </button>

      <button
        v-for="(pageItem, index) in visiblePages"
        :key="`${pageItem}-${index}`"
        type="button"
        class="flex items-center rounded-lg px-3 py-1.5 text-tokena-blue"
        :class="{ 'bg-tokena-blue text-white': page === pageItem }"
        @click="goTo(pageItem)"
      >
        {{ pageItem }}
      </button>

      <button type="button" class="flex items-center rounded-lg px-3 py-1.5" aria-label="Next page" @click="next">
        <img src="/icons/next-arrow-icon.svg" alt="">
      </button>
    </div>
  </div>
</template>
