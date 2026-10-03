<script setup lang="ts">
import type { MarketCoin } from '~/types/coin'

defineProps<{
  coins: MarketCoin[]
  isLoading: boolean
  hasFailed: boolean
}>()

const { isFavorite, toggle } = useFavorites()
const { open } = useCoinOverview()

/** Rows drawn while the market loads; matches the page size of the table. */
const SKELETON_ROWS = 10

const sparklineOptions = (priceChange: number) => ({
  chart: {
    type: 'line' as const,
    zoom: { enabled: false },
    toolbar: { show: false },
    sparkline: { enabled: true },
  },
  grid: { show: false },
  xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
  stroke: { curve: 'smooth' as const, width: 1.25 },
  tooltip: { enabled: false },
  colors: [priceChange >= 0 ? '#01B130' : '#CB0101'],
})

const sparklineSeries = (prices: number[]) => [{ name: 'Price', data: prices }]
</script>

<template>
  <UiCard>
    <div class="flex items-center justify-between gap-4 p-4">
      <h2 class="text-base font-semibold text-tokena-dark dark:text-tokena-light-gray">Market</h2>
      <button
        type="button"
        class="grid size-9 place-items-center rounded-[10px] border border-tokena-gray text-tokena-dark transition-colors hover:bg-tokena-light-gray dark:border-tokena-dark-gray dark:text-tokena-light-gray dark:hover:bg-tokena-dark-blue-2"
        aria-label="Market options"
      >
        <UiIcon name="ellipsis" :size="20" />
      </button>
    </div>

    <div class="w-full overflow-x-auto">
      <!-- The header stays put while rows load, so the columns do not jump. -->
      <table v-if="isLoading || coins.length" class="w-full border-collapse">
        <thead class="bg-tokena-light-gray text-tokena-dark dark:bg-tokena-dark-blue-2 dark:text-tokena-light-gray">
          <tr class="whitespace-nowrap text-left text-sm font-medium">
            <th class="w-12 px-4 py-3"><span class="sr-only">Favourite</span></th>
            <th class="px-4 py-3 font-medium">#</th>
            <th class="px-4 py-3 font-medium">Coins</th>
            <th class="px-4 py-3 font-medium">Price</th>
            <th class="px-4 py-3 font-medium">24h</th>
            <th class="px-4 py-3 font-medium">24h Volume</th>
            <th class="px-4 py-3 font-medium">Market Cap</th>
            <th class="px-4 py-3 font-medium">Last 7 Days</th>
          </tr>
        </thead>

        <tbody v-if="isLoading">
          <tr
            v-for="row in SKELETON_ROWS"
            :key="row"
            class="border-b border-tokena-light-gray last:border-0 dark:border-tokena-gray/10"
          >
            <td class="px-4 py-3"><UiSkeleton variant="circle" class="size-5" /></td>
            <td class="px-4 py-3"><UiSkeleton variant="text" class="w-4" /></td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <UiSkeleton variant="circle" class="size-6 shrink-0" />
                <UiSkeleton variant="text" class="w-28" />
              </div>
            </td>
            <td class="px-4 py-3"><UiSkeleton variant="text" class="w-20" /></td>
            <td class="px-4 py-3"><UiSkeleton class="h-5 w-14 rounded-full" /></td>
            <td class="px-4 py-3"><UiSkeleton variant="text" class="w-28" /></td>
            <td class="px-4 py-3"><UiSkeleton variant="text" class="w-32" /></td>
            <td class="px-4 py-3"><UiSkeleton class="h-8 w-[150px]" /></td>
          </tr>
        </tbody>

        <tbody v-else class="text-sm">
          <tr
            v-for="coin in coins"
            :key="coin.id"
            class="cursor-pointer whitespace-nowrap border-b border-tokena-light-gray transition-colors last:border-0 hover:bg-tokena-light-gray/60 dark:border-tokena-gray/10 dark:hover:bg-tokena-dark-blue-2/50"
            @click="open(coin.id)"
          >
            <td class="px-4 py-3">
              <button
                type="button"
                class="transition-colors"
                :class="isFavorite(coin.id) ? 'text-tokena-blue' : 'text-tokena-dark hover:text-tokena-blue dark:text-tokena-light-gray'"
                :aria-label="isFavorite(coin.id) ? `Remove ${coin.name} from favourites` : `Add ${coin.name} to favourites`"
                :aria-pressed="isFavorite(coin.id)"
                @click.stop="toggle(coin.id)"
              >
                <UiIcon name="star" :size="20" />
              </button>
            </td>
            <td class="px-4 py-3 text-tokena-dark dark:text-tokena-light-gray">{{ coin.market_cap_rank }}</td>
            <td class="px-4 py-3">
              <button
                type="button"
                class="flex items-center gap-2 text-left transition-colors hover:text-tokena-blue"
                @click.stop="open(coin.id)"
              >
                <img :src="coin.image" :alt="coin.name" width="24" height="24" class="size-6 shrink-0 rounded-full">
                <span class="font-medium text-tokena-dark dark:text-tokena-light-gray">
                  {{ coin.name }}-<span class="uppercase">{{ coin.symbol }}</span>
                </span>
              </button>
            </td>
            <td class="px-4 py-3 text-tokena-dark dark:text-tokena-light-gray">{{ formatPrice(coin.current_price) }}</td>
            <td class="px-4 py-3">
              <UiBadge :tone="coin.price_change_percentage_24h < 0 ? 'negative' : 'positive'">
                {{ formatPercent(coin.price_change_percentage_24h) }}
              </UiBadge>
            </td>
            <td class="px-4 py-3 text-tokena-dark dark:text-tokena-light-gray">{{ formatUsd(coin.total_volume) }}</td>
            <td class="px-4 py-3 text-tokena-dark dark:text-tokena-light-gray">{{ formatUsd(coin.market_cap) }}</td>
            <td class="px-4 py-3">
              <ClientOnly>
                <apexchart
                  height="40"
                  width="150"
                  type="line"
                  :options="sparklineOptions(coin.price_change_percentage_24h)"
                  :series="sparklineSeries(coin.sparkline_in_7d.price)"
                />
                <template #fallback>
                  <UiSkeleton class="h-8 w-[150px]" />
                </template>
              </ClientOnly>
            </td>
          </tr>
        </tbody>
      </table>

      <UiEmptyState
        v-else-if="hasFailed"
        icon="chart"
        title="Market data is unavailable"
        description="CoinGecko did not answer. Anonymous callers get rate limited fairly often, so this usually clears on its own."
      />

      <UiEmptyState
        v-else
        icon="search"
        title="No cryptocurrency found"
        description="Nothing matches this search and category. Try a different term."
      />
    </div>
  </UiCard>
</template>
