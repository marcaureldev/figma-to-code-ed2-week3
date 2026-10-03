/**
 * Which coin the overview panel is showing, shared so any list can open it.
 */
export const useCoinOverview = () => {
  const selectedCoinId = useState<string | null>('coin-overview:id', () => null)

  const open = (coinId: string): void => {
    selectedCoinId.value = coinId
  }
  const close = (): void => {
    selectedCoinId.value = null
  }

  return {
    selectedCoinId,
    isOpen: computed(() => selectedCoinId.value !== null),
    open,
    close,
  }
}
