import type { SelectOption } from '~/components/ui/Select.vue'

interface CoinCategory {
  category_id: string
  name: string
}

/**
 * The category list for the market filter.
 *
 * CoinGecko returns over a thousand categories, so this is fetched on the
 * client only: rendering them during SSR would add tens of kilobytes of
 * <option> markup to every page load for a control most readers never open.
 */
export const useCoinCategories = () => {
  const { coingeckoApiBase } = useRuntimeConfig().public

  const { data, status } = useFetch<CoinCategory[]>(
    `${coingeckoApiBase}/coins/categories/list`,
    {
      key: 'coingecko-categories',
      server: false,
      lazy: true,
    },
  )

  const options = computed<SelectOption[]>(() =>
    (data.value ?? [])
      // A few names arrive padded (" DN-404"), which would sort them ahead of
      // every digit and letter and read as a stray indent in the list.
      .map((category) => ({
        label: category.name.trim(),
        value: category.category_id,
      }))
      .filter((option) => option.label.length > 0)
      .sort((a, b) => a.label.localeCompare(b.label)),
  )

  return { options, isLoading: computed(() => status.value === 'pending') }
}
