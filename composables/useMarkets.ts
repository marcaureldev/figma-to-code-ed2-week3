import type { MarketCoin } from '~/types/coin'

const COINGECKO_MARKETS = 'https://api.coingecko.com/api/v3/coins/markets'

/**
 * Fetches the market table rows.
 *
 * `data` is `null` until the request resolves, and stays `null` when it fails,
 * so every consumer must cope with an empty list. CoinGecko rate-limits
 * anonymous callers fairly aggressively, which makes that a routine case
 * rather than an edge one.
 */
export const useMarkets = () => {
  const { data, error, status, refresh } = useFetch<MarketCoin[]>(COINGECKO_MARKETS, {
    key: 'coingecko-markets',
    query: {
      vs_currency: 'usd',
      per_page: 100,
      page: 1,
      sparkline: true,
    },
  })

  /** Always a usable array, whatever the request did. */
  const coins = computed<MarketCoin[]>(() => data.value ?? [])

  const isLoading = computed(() => status.value === 'pending')
  const hasFailed = computed(() => status.value === 'error')

  return { coins, error, isLoading, hasFailed, refresh }
}
