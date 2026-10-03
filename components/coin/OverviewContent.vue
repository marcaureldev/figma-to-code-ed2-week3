<script setup lang="ts">
const props = defineProps<{ coinId: string }>();

defineEmits<{ close: [] }>();

const { detail, chart, isLoading, hasFailed } = useCoinDetail(props.coinId);
const { isFavorite, toggle } = useFavorites();

const colorMode = useColorMode();

const description = computed(() => {
  const raw = detail.value?.description.en;
  return raw ? toPlainText(raw) : "";
});

/** Label and value pairs of the design's stats list. */
const stats = computed(() => {
  const market = detail.value?.market_data;
  if (!market) return [];

  return [
    { label: "Market cap", value: formatUsd(market.market_cap.usd ?? 0) },
    {
      label: "Circulating supply",
      value: formatAmount(market.circulating_supply ?? 0),
    },
    { label: "24 Hour High", value: formatPrice(market.high_24h.usd ?? 0) },
    { label: "24 Hour Low", value: formatPrice(market.low_24h.usd ?? 0) },
  ];
});

const chartSeries = computed(() => [
  { name: "Price", data: chart.value?.prices ?? [] },
]);

const chartOptions = computed(() => {
  const isDark = colorMode.value === "dark";

  return {
    chart: {
      type: "line" as const,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "Mona Sans, sans-serif",
      background: "transparent",
    },
    theme: { mode: isDark ? ("dark" as const) : ("light" as const) },
    colors: ["#00C234"],
    stroke: { curve: "smooth" as const, width: 2 },
    grid: { borderColor: isDark ? "#292C3B" : "#F3F4F6" },
    dataLabels: { enabled: false },
    legend: {
      show: true,
      position: "bottom" as const,
      horizontalAlign: "left" as const,
    },
    xaxis: {
      type: "datetime" as const,
      labels: { style: { colors: "#6B7280", fontSize: "10px" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: "#6B7280", fontSize: "10px" },
        formatter: (value: number) => formatUsd(value),
      },
    },
    tooltip: { x: { format: "dd MMM yyyy" } },
  };
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between gap-4">
      <h2
        class="truncate text-base font-bold text-tokena-dark dark:text-tokena-light-gray"
      >
        {{ detail?.name ?? "Loading…" }}
      </h2>
      <button
        type="button"
        class="grid size-8 shrink-0 place-items-center rounded-lg bg-tokena-gray/40 text-tokena-dark transition-colors hover:bg-tokena-gray/60 dark:bg-tokena-dark-blue-2 dark:text-tokena-light-gray"
        aria-label="Close"
        @click="$emit('close')"
      >
        <UiIcon name="close" :size="20" />
      </button>
    </div>

    <CoinOverviewSkeleton v-if="isLoading" />

    <UiEmptyState
      v-else-if="hasFailed || !detail"
      icon="chart"
      title="This coin could not be loaded"
      description="CoinGecko did not answer. Anonymous callers get rate limited fairly often, so this usually clears on its own."
    />

    <div v-else class="mt-6 space-y-6">
      <ClientOnly>
        <apexchart
          type="line"
          height="186"
          :options="chartOptions"
          :series="chartSeries"
        />
        <template #fallback>
          <UiSkeleton class="h-[186px] w-full" />
        </template>
      </ClientOnly>

      <div class="flex items-center justify-between gap-4">
        <div class="flex min-w-0 items-center gap-1.5">
          <img
            :src="detail.image.small"
            :alt="detail.name"
            width="32"
            height="32"
            class="size-8 shrink-0 rounded-full"
          />
          <p
            class="truncate text-sm font-semibold text-tokena-dark dark:text-tokena-light-gray"
          >
            {{ detail.name }} (<span class="uppercase">{{ detail.symbol }}</span
            >/USD)
          </p>
        </div>
        <p
          class="shrink-0 text-sm font-semibold text-tokena-dark dark:text-tokena-light-gray"
        >
          {{ formatPrice(detail.market_data.current_price.usd ?? 0) }}
        </p>
      </div>

      <div class="space-y-1.5">
        <div class="flex items-center justify-between gap-4">
          <p
            class="text-sm font-medium text-tokena-dark dark:text-tokena-light-gray"
          >
            Crypto Market Rank
          </p>
          <UiBadge v-if="detail.market_cap_rank"
            >Rank #{{ detail.market_cap_rank }}</UiBadge
          >
          <span v-else class="text-sm text-tokena-dark-gray">Unranked</span>
        </div>
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="flex items-center justify-between gap-4 text-sm font-medium"
        >
          <p class="text-tokena-dark dark:text-tokena-light-gray">
            {{ stat.label }}
          </p>
          <p class="text-tokena-dark-gray dark:text-tokena-gray">
            {{ stat.value }}
          </p>
        </div>
      </div>

      <div v-if="description" class="space-y-2">
        <p
          class="text-sm font-medium text-tokena-dark dark:text-tokena-light-gray"
        >
          Description
        </p>
        <p
          class="max-h-40 overflow-y-auto text-xs leading-4 text-tokena-dark-gray dark:text-tokena-gray"
        >
          {{ description }}
        </p>
      </div>

      <UiButton
        variant="ghost"
        size="md"
        icon="star"
        class="w-full"
        @click="toggle(detail.id)"
      >
        {{
          isFavorite(detail.id) ? "Remove from favorites" : "Add to favorites"
        }}
      </UiButton>
    </div>
  </div>
</template>
