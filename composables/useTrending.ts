import type { TrendingCoin, TrendingResponse } from '~/types/coin'

/** How many trending cards the dashboard shows. */
const TRENDING_LIMIT = 4

/**
 * Fetches the coins behind the dashboard's "Trending" row.
 *
 * The returned list is a computed, not a plain slice: reading `data.value`
 * once during setup would capture `null`, because the request has not resolved
 * at that point, and the row would silently stay empty.
 */
export const useTrending = () => {
  const { coingeckoApiBase } = useRuntimeConfig().public

  const { data, error, status, refresh } = useFetch<TrendingResponse>(`${coingeckoApiBase}/search/trending`, {
    key: 'coingecko-trending',
  })

  const coins = computed<TrendingCoin[]>(() => data.value?.coins?.slice(0, TRENDING_LIMIT) ?? [])

  const isLoading = computed(() => status.value === 'pending')
  const hasFailed = computed(() => status.value === 'error')

  return { coins, error, isLoading, hasFailed, refresh }
}
