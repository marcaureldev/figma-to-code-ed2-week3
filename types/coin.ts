/**
 * Shapes returned by the CoinGecko public API.
 * @see https://docs.coingecko.com/v3.0.1/reference/introduction
 */

/** Seven days of hourly prices, used for the market table sparklines. */
export interface Sparkline {
  price: number[]
}

/** A single row of `GET /coins/markets`. */
export interface MarketCoin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number | null
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number | null
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: unknown | null
  last_updated: string
  sparkline_in_7d: Sparkline
}

/**
 * Per-currency figures on a trending coin. CoinGecko returns the money values
 * pre-formatted as display strings here, unlike `/coins/markets`.
 */
export interface TrendingCoinData {
  price: number
  price_btc: string
  /** Keyed by lowercase currency code: `usd`, `eur`, `aed`… */
  price_change_percentage_24h: Record<string, number>
  market_cap: string
  market_cap_btc: string
  total_volume: string
  total_volume_btc: string
  sparkline: string
  content: unknown | null
}

export interface TrendingCoinItem {
  id: string
  coin_id: number
  name: string
  symbol: string
  market_cap_rank: number
  thumb: string
  small: string
  large: string
  slug: string
  price_btc: number
  score: number
  data: TrendingCoinData
}

export interface TrendingCoin {
  item: TrendingCoinItem
}

/** Response of `GET /search/trending`. */
export interface TrendingResponse {
  coins: TrendingCoin[]
  nfts: unknown[]
  categories: unknown[]
}

/** Subset of `GET /coins/{id}` the overview panel needs. */
export interface CoinDetail {
  id: string
  symbol: string
  name: string
  market_cap_rank: number | null
  image: {
    thumb: string
    small: string
    large: string
  }
  description: {
    /** HTML, and frequently empty for smaller coins. */
    en: string
  }
  market_data: {
    current_price: Record<string, number>
    market_cap: Record<string, number>
    high_24h: Record<string, number>
    low_24h: Record<string, number>
    circulating_supply: number
  }
}

/** Response of `GET /coins/{id}/market_chart`: `[timestamp, price]` pairs. */
export interface MarketChart {
  prices: [number, number][]
}
