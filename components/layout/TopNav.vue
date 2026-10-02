<script setup lang="ts">
import { navigationItems } from './navigation'

const route = useRoute()
const { toggle } = useSidebar()

/**
 * The mockup prints "Dashboard" on the News screen too, which reads as an
 * oversight rather than intent, so the heading follows the current route.
 */
const heading = computed(
  () => navigationItems.find(item => item.to === route.path)?.label ?? 'Dashboard',
)
</script>

<template>
  <header
    class="flex items-center justify-between gap-4 border-b border-tokena-light-gray bg-white px-4 py-3 sm:px-6 dark:border-tokena-gray/15 dark:bg-tokena-dark-blue-1"
  >
    <div class="flex min-w-0 items-center gap-4">
      <button
        type="button"
        class="shrink-0 text-tokena-dark-gray lg:hidden dark:text-tokena-light-gray"
        aria-label="Open menu"
        @click="toggle"
      >
        <UiIcon name="burger-menu" :size="20" />
      </button>

      <div class="min-w-0">
        <p class="truncate text-sm font-semibold text-tokena-dark dark:text-tokena-light-gray">
          {{ heading }}
        </p>
        <p class="truncate text-xs font-medium text-tokena-dark-gray dark:text-tokena-gray">
          Welcome back, John Doe !
        </p>
      </div>

      <UiButton icon="add-wallet" class="hidden md:inline-flex">Connect wallet</UiButton>
    </div>

    <div class="flex shrink-0 items-center gap-3">
      <button
        type="button"
        class="flex h-9 items-center gap-0.5 rounded-[10px] border border-tokena-gray bg-white px-5 py-2.5 text-xs font-medium text-tokena-dark-gray transition-colors hover:bg-tokena-light-gray dark:border-tokena-dark-gray dark:bg-tokena-dark-blue-1 dark:text-tokena-light-gray dark:hover:bg-tokena-dark-blue-2"
      >
        USD
        <UiIcon name="up-down-chevron" :size="16" />
      </button>

      <UiThemeSwitcher />
    </div>
  </header>
</template>
