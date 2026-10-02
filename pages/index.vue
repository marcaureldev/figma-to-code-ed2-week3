<script setup lang="ts">
useHead({ title: 'Dashboard — Tokena' })
</script>

<template>
  <div class="space-y-5">
    <div class="flex flex-col gap-5 xl:flex-row xl:items-end">
      <DashboardBalanceCard />
      <DashboardTrendingSection />
    </div>

    <DashboardMarketSection />
  </div>
</template>
