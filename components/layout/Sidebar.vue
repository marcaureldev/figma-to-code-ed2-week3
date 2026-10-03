<script setup lang="ts">
import { navigationItems } from './navigation'

const { isOpen, close } = useSidebar()
</script>

<template>
  <!-- Backdrop, mobile only: the sidebar is permanent from `lg` up. -->
  <div
    v-show="isOpen"
    class="fixed inset-0 z-30 bg-tokena-dark/40 lg:hidden"
    aria-hidden="true"
    @click="close"
  ></div>

  <aside
    class="fixed inset-y-0 left-0 z-40 flex w-60 flex-col justify-between overflow-y-auto border-r border-tokena-gray bg-white px-3.5 py-4 transition-transform duration-300 dark:border-tokena-gray/15 dark:bg-tokena-dark-blue-1 lg:translate-x-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex w-full flex-col items-center gap-9">
      <div class="flex w-full items-center gap-2">
        <UiLogo />
        <button
          type="button"
          class="rounded-[10px] p-2 text-tokena-dark-gray dark:text-tokena-light-gray lg:hidden"
          aria-label="Close menu"
          @click="close"
        >
          <UiIcon name="close" :size="20" />
        </button>
      </div>

      <nav class="flex w-full flex-col gap-5">
        <p
          class="text-sm font-medium text-tokena-dark-gray dark:text-tokena-light-gray"
        >
          Menu
        </p>
        <ul class="flex w-full flex-col gap-0.5">
          <li v-for="item in navigationItems" :key="item.label">
            <LayoutSidebarLink
              :label="item.label"
              :icon="item.icon"
              :to="item.to"
              :has-sublinks="item.hasSublinks"
            />
          </li>
        </ul>
      </nav>
    </div>

    <LayoutUserProfile class="mt-9" />
  </aside>
</template>
