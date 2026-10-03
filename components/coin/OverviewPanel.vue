<script setup lang="ts">
import OverviewContent from './OverviewContent.vue'

const { selectedCoinId, isOpen, close } = useCoinOverview()

const panel = ref<HTMLElement | null>(null)

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') close()
}

// Keep the page behind the panel from scrolling, and restore it on close.
watch(isOpen, (open) => {
  if (!import.meta.client) return

  document.body.style.overflow = open ? 'hidden' : ''
  if (open) nextTick(() => panel.value?.focus())
})

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && selectedCoinId"
        class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-tokena-dark/50 p-4 sm:items-center"
        role="dialog"
        aria-modal="true"
        aria-label="Coin overview"
        @click.self="close"
        @keydown="onKeydown"
      >
        <div
          ref="panel"
          tabindex="-1"
          class="my-auto w-full max-w-[496px] rounded-2xl bg-white p-5 outline-none dark:bg-tokena-dark-blue-1"
        >
          <!-- Keyed so switching coins remounts and refetches cleanly. -->
          <OverviewContent :key="selectedCoinId" :coin-id="selectedCoinId" @close="close" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
