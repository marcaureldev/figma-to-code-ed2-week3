<script setup lang="ts">
const ELLIPSIS = '…' as const

export type PageItem = number | typeof ELLIPSIS

const page = defineModel<number>({ required: true })

const props = withDefaults(
  defineProps<{
    totalPages: number
    /** Pages shown either side of the current one. */
    window?: number
  }>(),
  { window: 2 },
)

/** First page, last page, a window around the current one, ellipses between. */
const items = computed<PageItem[]>(() => {
  if (props.totalPages <= 1) return []

  const pages: PageItem[] = [1]

  if (page.value > props.window + 2) pages.push(ELLIPSIS)

  const start = Math.max(2, page.value - props.window)
  const end = Math.min(props.totalPages - 1, page.value + props.window)

  for (let index = start; index <= end; index += 1) pages.push(index)

  if (page.value < props.totalPages - props.window - 1) pages.push(ELLIPSIS)

  pages.push(props.totalPages)

  return pages
})

const goTo = (item: PageItem): void => {
  if (item !== ELLIPSIS) page.value = item
}

const previous = (): void => {
  if (page.value > 1) page.value -= 1
}

const next = (): void => {
  if (page.value < props.totalPages) page.value += 1
}
</script>

<template>
  <nav v-if="items.length" class="flex items-center justify-center gap-2" aria-label="Pagination">
    <button
      type="button"
      class="grid size-8 place-items-center rounded-[10px] text-tokena-dark-gray transition-colors hover:bg-tokena-light-gray disabled:opacity-40 disabled:hover:bg-transparent dark:text-tokena-gray dark:hover:bg-tokena-dark-blue-2"
      :disabled="page === 1"
      aria-label="Previous page"
      @click="previous"
    >
      <UiIcon name="previous-arrow" :size="12" />
    </button>

    <template v-for="(item, index) in items" :key="`${item}-${index}`">
      <span v-if="item === '…'" class="px-1 text-sm text-tokena-dark-gray dark:text-tokena-gray">…</span>
      <button
        v-else
        type="button"
        class="min-w-8 rounded-[10px] px-3 py-1.5 text-sm font-medium transition-colors"
        :class="page === item
          ? 'bg-tokena-blue text-white'
          : 'text-tokena-blue hover:bg-tokena-blue/[0.07]'"
        :aria-current="page === item ? 'page' : undefined"
        @click="goTo(item)"
      >
        {{ item }}
      </button>
    </template>

    <button
      type="button"
      class="grid size-8 place-items-center rounded-[10px] text-tokena-dark transition-colors hover:bg-tokena-light-gray disabled:opacity-40 disabled:hover:bg-transparent dark:text-tokena-light-gray dark:hover:bg-tokena-dark-blue-2"
      :disabled="page === totalPages"
      aria-label="Next page"
      @click="next"
    >
      <UiIcon name="next-arrow" :size="12" />
    </button>
  </nav>
</template>
