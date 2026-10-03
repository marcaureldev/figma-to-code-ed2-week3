<script setup lang="ts">
const ITEMS_PER_PAGE = 10

const search = ref('')
const category = ref('')
const page = ref(1)

const { coins, isLoading, hasFailed } = useMarkets({ category })
const { options: categoryOptions } = useCoinCategories()

/** Name and symbol are what a reader types, so match on both. */
const matching = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return coins.value

  return coins.value.filter(
    (coin) =>
      coin.name.toLowerCase().includes(term) ||
      coin.symbol.toLowerCase().includes(term),
  )
})

const totalPages = computed(() =>
  Math.ceil(matching.value.length / ITEMS_PER_PAGE),
)

const visibleCoins = computed(() => {
  const start = ITEMS_PER_PAGE * (page.value - 1)
  return matching.value.slice(start, start + ITEMS_PER_PAGE)
})

// A narrower result set can leave the reader on a page that no longer exists.
watch([search, category], () => {
  page.value = 1
})
watch(totalPages, (count) => {
  if (count > 0 && page.value > count) page.value = count
})
</script>

<template>
  <section class="space-y-5">
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <UiSearchInput v-model="search" class="w-full sm:max-w-xs" />
      <UiSelect
        v-model="category"
        :options="categoryOptions"
        placeholder="Categories"
        class="w-full sm:max-w-[230px]"
      />
    </div>

    <DashboardMarketTable
      :coins="visibleCoins"
      :is-loading="isLoading"
      :has-failed="hasFailed"
    />

    <UiPagination v-model="page" :total-pages="totalPages" />
  </section>
</template>
