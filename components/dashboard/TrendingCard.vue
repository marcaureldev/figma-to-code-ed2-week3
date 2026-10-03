<script setup lang="ts">
import type { TrendingCoin } from '~/types/coin'

const props = defineProps<{ coin: TrendingCoin }>()

const item = computed(() => props.coin.item)

/** The app prices everything in USD, so read the USD change, not another currency. */
const changePercent = computed(
  () => item.value.data.price_change_percentage_24h.usd ?? 0,
)

const tone = computed(() =>
  changePercent.value >= 0 ? 'positive' : 'negative',
)
</script>

<template>
  <UiCard class="flex flex-col gap-2.5 p-3">
    <div class="flex items-center gap-1.5">
      <div class="flex min-w-0 flex-1 items-center gap-1">
        <img
          :src="item.thumb"
          :alt="item.name"
          width="32"
          height="32"
          class="size-8 shrink-0 rounded-full object-cover"
        />
        <div class="min-w-0 flex-1">
          <UiTooltip :label="item.name" class="w-full">
            <p
              class="truncate text-xs font-bold leading-4 text-tokena-dark-gray dark:text-tokena-light-gray"
            >
              {{ item.name }}
            </p>
          </UiTooltip>
          <p
            class="text-xxs font-bold uppercase text-tokena-dark-gray/60 dark:text-tokena-gray/60"
          >
            {{ item.symbol }}
          </p>
        </div>
      </div>

      <UiBadge :tone="tone" with-trend-icon>{{
        formatPercent(changePercent)
      }}</UiBadge>
    </div>

    <div class="text-tokena-dark-gray dark:text-tokena-gray">
      <p class="text-xs font-bold leading-4">
        {{ formatAmount(item.data.price) }}
        <span class="uppercase">{{ item.symbol }}</span>
      </p>
      <!-- CoinGecko already formats the trending market cap as a display string. -->
      <p class="text-xxs font-medium">{{ item.data.market_cap }}</p>
    </div>
  </UiCard>
</template>
