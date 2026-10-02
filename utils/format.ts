/** Number and currency formatting shared by the dashboard views. */

const LOCALE = 'en-US'

/**
 * Whole-dollar amounts: balances, volumes, market caps.
 * The design prints these without decimals — "$20,522,294,968".
 */
export const formatUsd = (value: number): string =>
  new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

/**
 * Coin prices, which span several orders of magnitude. Above a dollar the
 * design shows two decimals ("$58,765.16"); below it, enough significant
 * digits to stay meaningful ("$0.9994").
 */
export const formatPrice = (value: number): string =>
  new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: value >= 1 ? 2 : 6,
  }).format(value)

/** Signed percentage, as the badges show it — "+2.3%", "-0.05%". */
export const formatPercent = (value: number): string =>
  `${value > 0 ? '+' : ''}${value.toFixed(2)}%`

/** Token amounts next to their symbol — "143.76 SOL". */
export const formatAmount = (value: number): string =>
  new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits: 2,
    maximumFractionDigits: value >= 1 ? 2 : 6,
  }).format(value)
