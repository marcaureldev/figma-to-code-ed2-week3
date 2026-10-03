<script setup lang="ts">
defineProps<{ label: string }>()

const trigger = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const position = ref({ top: 0, left: 0 })

const show = (): void => {
  const rect = trigger.value?.getBoundingClientRect()
  if (!rect) return

  position.value = { top: rect.top - 8, left: rect.left + rect.width / 2 }
  isVisible.value = true
}

const hide = (): void => {
  isVisible.value = false
}

// Fixed coordinates go stale the moment anything scrolls underneath.
onMounted(() => {
  window.addEventListener('scroll', hide, true)
  window.addEventListener('resize', hide)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', hide, true)
  window.removeEventListener('resize', hide)
})
</script>

<template>
  <span
    ref="trigger"
    class="inline-flex min-w-0"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />

    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-100"
        leave-active-class="transition-opacity duration-75"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <span
          v-if="isVisible"
          role="tooltip"
          class="pointer-events-none fixed z-[60] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-tokena-dark px-2 py-1 text-xxs font-medium text-white shadow-[0_0_4px_rgba(0,0,0,0.15)] dark:bg-tokena-dark-blue-2 dark:text-tokena-light-gray"
          :style="{ top: `${position.top}px`, left: `${position.left}px` }"
        >
          {{ label }}
        </span>
      </Transition>
    </Teleport>
  </span>
</template>
