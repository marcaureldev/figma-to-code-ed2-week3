<script setup lang="ts">
export interface SelectOption {
  label: string
  value: string
}

const model = defineModel<string>({ default: '' })

const props = withDefaults(
  defineProps<{
    options: SelectOption[]
    placeholder: string
    /** Shows a filter field. Worth it past a couple of dozen options. */
    searchable?: boolean
  }>(),
  { searchable: true },
)

const isOpen = ref(false)
const search = ref('')
const activeIndex = ref(0)

const root = ref<HTMLElement | null>(null)
const searchField = ref<HTMLInputElement | null>(null)
const list = ref<HTMLElement | null>(null)

const listId = useId()

/** The placeholder doubles as the entry that clears the filter. */
const allOptions = computed<SelectOption[]>(() => [
  { label: props.placeholder, value: '' },
  ...props.options,
])

const visibleOptions = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return allOptions.value

  return allOptions.value.filter((option) =>
    option.label.toLowerCase().includes(term),
  )
})

const selectedLabel = computed(
  () =>
    props.options.find((option) => option.value === model.value)?.label ??
    props.placeholder,
)

const hasSelection = computed(() => model.value !== '')

const scrollActiveIntoView = (): void => {
  nextTick(() => {
    list.value
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest' })
  })
}

const close = (): void => {
  isOpen.value = false
  search.value = ''
}

const openList = (): void => {
  isOpen.value = true
  activeIndex.value = Math.max(
    0,
    visibleOptions.value.findIndex((option) => option.value === model.value),
  )

  nextTick(() => {
    searchField.value?.focus()
    scrollActiveIntoView()
  })
}

const toggle = (): void => {
  if (isOpen.value) close()
  else openList()
}

const select = (option: SelectOption): void => {
  model.value = option.value
  close()
}

const move = (delta: number): void => {
  const count = visibleOptions.value.length
  if (count === 0) return

  activeIndex.value = (activeIndex.value + delta + count) % count
  scrollActiveIntoView()
}

const onKeydown = (event: KeyboardEvent): void => {
  if (!isOpen.value) {
    if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
      event.preventDefault()
      openList()
    }
    return
  }

  switch (event.key) {
    case 'Escape':
      event.preventDefault()
      close()
      break
    case 'ArrowDown':
      event.preventDefault()
      move(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      move(-1)
      break
    case 'Home':
      event.preventDefault()
      activeIndex.value = 0
      scrollActiveIntoView()
      break
    case 'End':
      event.preventDefault()
      activeIndex.value = visibleOptions.value.length - 1
      scrollActiveIntoView()
      break
    case 'Enter': {
      event.preventDefault()
      const option = visibleOptions.value[activeIndex.value]
      if (option) select(option)
      break
    }
  }
}

// Filtering changes the list, so the highlight has to come back in range.
watch(search, () => {
  activeIndex.value = 0
  scrollActiveIntoView()
})

const onPointerDown = (event: PointerEvent): void => {
  if (!root.value?.contains(event.target as Node)) close()
}

onMounted(() => document.addEventListener('pointerdown', onPointerDown))
onBeforeUnmount(() =>
  document.removeEventListener('pointerdown', onPointerDown),
)
</script>

<template>
  <div ref="root" class="relative" @keydown="onKeydown">
    <button
      type="button"
      class="flex h-10 w-full items-center justify-between gap-2 rounded-[10px] border border-tokena-gray bg-white px-4 text-left text-sm font-medium transition-colors hover:bg-tokena-light-gray dark:border-tokena-dark-gray dark:bg-tokena-dark-blue-1 dark:hover:bg-tokena-dark-blue-2"
      :class="
        hasSelection
          ? 'text-tokena-dark dark:text-tokena-light-gray'
          : 'text-tokena-dark-gray dark:text-tokena-gray'
      "
      role="combobox"
      :aria-expanded="isOpen"
      :aria-controls="listId"
      aria-haspopup="listbox"
      @click="toggle"
    >
      <span class="truncate">{{ selectedLabel }}</span>
      <UiIcon
        name="chevron-down"
        :size="20"
        class="shrink-0 transition-transform"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      leave-active-class="transition duration-100 ease-in"
      enter-from-class="-translate-y-1 opacity-0"
      leave-to-class="-translate-y-1 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 z-30 mt-1 flex w-full min-w-[260px] flex-col rounded-xl bg-white p-1.5 shadow-[0_0_4px_rgba(0,0,0,0.15)] dark:bg-tokena-dark-blue-1"
      >
        <div v-if="searchable" class="relative mb-1">
          <UiIcon
            name="search"
            :size="16"
            class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-tokena-dark-gray"
          />
          <input
            ref="searchField"
            v-model="search"
            type="search"
            placeholder="Filter..."
            :aria-label="`Filter ${placeholder.toLowerCase()}`"
            class="h-9 w-full rounded-[10px] bg-tokena-light-gray pl-9 pr-3 text-sm font-medium text-tokena-dark placeholder:text-tokena-dark-gray focus:outline-none dark:bg-tokena-dark-blue-2 dark:text-tokena-light-gray"
          />
        </div>

        <ul
          :id="listId"
          ref="list"
          role="listbox"
          class="max-h-64 overflow-y-auto"
        >
          <li
            v-for="(option, index) in visibleOptions"
            :key="option.value || 'all'"
            role="option"
            :aria-selected="option.value === model"
            :data-active="index === activeIndex"
            class="flex h-10 cursor-pointer items-center rounded-[10px] px-4 text-sm text-tokena-dark dark:text-tokena-light-gray"
            :class="{
              'bg-tokena-blue/10': index === activeIndex,
              'font-semibold': option.value === model,
            }"
            @click="select(option)"
            @mousemove="activeIndex = index"
          >
            <span class="truncate">{{ option.label }}</span>
          </li>

          <li
            v-if="visibleOptions.length === 0"
            class="flex h-10 items-center px-4 text-sm text-tokena-dark-gray dark:text-tokena-gray"
          >
            No match
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
