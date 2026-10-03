<script setup lang="ts">
/**
 * The balance is fixed in the design and there is no account API behind it,
 * so the figures are the mockup's.
 */
const BALANCE_USD = 63_755_200
const CHANGE_PERCENT = 2.3
</script>

<template>
  <UiCard class="flex w-full flex-col gap-2 p-3 xl:max-w-[316px]">
    <div class="flex flex-col gap-1.5">
      <p
        class="text-lg font-semibold text-tokena-dark dark:text-tokena-light-gray"
      >
        Balance
      </p>

      <div class="flex flex-wrap items-center gap-1.5">
        <p class="text-lg font-bold text-tokena-dark dark:text-white">
          {{ formatUsd(BALANCE_USD) }}
        </p>
        <div class="flex items-center gap-1.5">
          <UiBadge tone="positive">{{ formatPercent(CHANGE_PERCENT) }}</UiBadge>
          <p
            class="text-xs font-medium text-tokena-dark-gray dark:text-tokena-gray"
          >
            vs last month
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-1.5">
      <UiButton variant="ghost" size="md" icon="arrow-up" class="flex-1"
        >Deposit</UiButton
      >
      <UiButton variant="ghost" size="md" icon="arrow-down" class="flex-1"
        >Withdraw</UiButton
      >
    </div>
  </UiCard>
</template>
