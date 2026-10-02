const STORAGE_KEY = 'tokena:favorites'

/**
 * Starred coins, kept in localStorage.
 *
 * There is no account behind the app, so favourites belong to the browser.
 * Reads are deferred to the client because localStorage does not exist during
 * SSR, and are defensive because it can throw in private windows.
 */
export const useFavorites = () => {
  const favorites = useState<string[]>('favorites', () => [])

  onMounted(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) favorites.value = JSON.parse(stored) as string[]
    }
    catch {
      // Unavailable or corrupt: start from an empty list rather than break.
    }
  })

  const persist = (): void => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
    }
    catch {
      // Storage can be full or blocked; the in-memory list still works.
    }
  }

  const isFavorite = (coinId: string): boolean => favorites.value.includes(coinId)

  const toggle = (coinId: string): void => {
    favorites.value = isFavorite(coinId)
      ? favorites.value.filter(id => id !== coinId)
      : [...favorites.value, coinId]

    persist()
  }

  return { favorites, isFavorite, toggle }
}
