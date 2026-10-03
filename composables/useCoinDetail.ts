import type { CoinDetail, MarketChart } from '~/types/coin'

/** Days of price history the design's chart covers. */
const CHART_DAYS = 180

/**
 * Loads one coin's detail and price history.
 *
 * Takes the id by value rather than as a ref: the caller is mounted only while
 * a coin is selected, so both requests fire on mount and are keyed per coin.
 */
export const useCoinDetail = (coinId: string) => {
  const { coingeckoApiBase } = useRuntimeConfig().public

  const { data: detail, status: detailStatus } = useFetch<CoinDetail>(
    `${coingeckoApiBase}/coins/${coinId}`,
    {
      key: `coin-detail:${coinId}`,
      query: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    },
  )

  const { data: chart, status: chartStatus } = useFetch<MarketChart>(
    `${coingeckoApiBase}/coins/${coinId}/market_chart`,
    {
      key: `coin-chart:${coinId}`,
      query: { vs_currency: 'usd', days: CHART_DAYS, interval: 'daily' },
    },
  )

  const isLoading = computed(
    () => detailStatus.value === 'pending' || chartStatus.value === 'pending',
  )
  const hasFailed = computed(
    () => detailStatus.value === 'error' || chartStatus.value === 'error',
  )

  return { detail, chart, isLoading, hasFailed }
}
