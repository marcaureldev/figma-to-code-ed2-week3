import type { MarketCoin } from '~/types/coin'

/** CoinGecko's maximum page size, and more rows than the table ever paginates. */
const PER_PAGE = 100

/**
 * Fetches the market table rows.
 *
 * `data` is `null` until the request resolves, and stays `null` when it fails,
 * so `coins` always normalises to an array: CoinGecko rate-limits anonymous
 * callers fairly aggressively, which makes failure a routine case.
 *
 * Passing a `category` ref re-runs the request whenever it changes, because
 * the category is applied by the API, not by us — the market payload carries
 * no category field to filter on.
 */
export const useMarkets = (options: { category?: Ref<string> } = {}) => {
  const { coingeckoApiBase } = useRuntimeConfig().public
  const category = options.category ?? ref('')

  const { data, error, status, refresh } = useFetch<MarketCoin[]>(
    `${coingeckoApiBase}/coins/markets`,
    {
      query: {
        vs_currency: 'usd',
        per_page: PER_PAGE,
        page: 1,
        sparkline: true,
        // An empty string would be sent as a real filter, so drop it instead.
        category: computed(() => category.value || undefined),
      },
    },
  )

  const coins = computed<MarketCoin[]>(() => data.value ?? [])

  return {
    coins,
    error,
    isLoading: computed(() => status.value === 'pending'),
    hasFailed: computed(() => status.value === 'error'),
    refresh,
  }
}
