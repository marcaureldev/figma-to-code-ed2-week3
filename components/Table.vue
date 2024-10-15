<template>
  <div class="w-full overflow-x-auto">
    <table v-if="marketLists" class="w-full">
      <thead class="bg-tokena-gray text-tokena-dark">
        <tr class="">
          <td class="px-4 py-3"></td>
          <td class="px-4 py-3">#</td>
          <td class="px-4 py-3">Coins</td>
          <td class="px-4 py-3">Price</td>
          <td class="px-4 py-3">24h</td>
          <td class="px-4 py-3">24h Volume</td>
          <td class="px-4 py-3">Market Cap</td>
          <td class="px-4 py-3">Last 7 days</td>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr v-for="(item, index) in marketLists" :key="index" class="bg-white border-b hover:bg-gray-100">
          <td class="px-4 py-3"><img src="/icons/star-icon.svg" alt=""></td>
          <td class="px-4 py-3">{{ item.market_cap_rank }}</td>
          <td class="text-sm font-bold p-1 whitespace-nowrap">
            <div class="flex items-center space-x-1">
              <img :src="item.image" :alt="item.name" class="w-6 h-6">
              <p class="flex items-center">{{ item.name }}-<span class="uppercase">{{ item.symbol
                  }}</span></p>
            </div>
          </td>
          <td class="py-3 p-2">${{ item.current_price.toLocaleString() }}</td>
          <td class="py-3 max-w-2 font-semibold text-xs text-center">
            <span :class="[
              'p-1 rounded-full text-xs font-semibold',
              item.price_change_percentage_24h < 0
                ? 'bg-tokena-red bg-opacity-[15%] text-tokena-red max-w-2'
                : 'bg-tokena-green bg-opacity-[15%] text-tokena-green max-w-2'
            ]">
              {{ item.price_change_percentage_24h.toFixed(2) }}%
            </span>
          </td>
          <td class="py-3">${{ item.total_volume.toLocaleString() }}</td>
          <td class="py-3">${{ item.market_cap_change_24h.toLocaleString() }}</td>
          <td class="py-3 p-2">
            <ClientOnly>
              <apexchart height="50px" width="150px" type="line"
                :options="getChartOptions(item.price_change_percentage_24h)"
                :series="formatSparklineData(item.sparkline_in_7d.price)"></apexchart>
            </ClientOnly>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="flex justify-center items-center w-full h-full">
      There is any cryptocurrency to display for the moment. Wait a few minute
    </div>
  </div>
</template>

<script setup>
const { data: marketLists } = await useFetch('https://api.coingecko.com/api/v3/coins/markets',
  {
    params: {
      vs_currency: 'usd',
      per_page: 10,
      page: 1,
      sparkline: true,
    }
  }
)
const chartOptions = ref({
  chart: {
    type: 'line',
    zoom: { enabled: false },
    toolbar: { show: false },
    sparkline: { enabled: true },
    width: '50px',
  },
  grid: { show: false },
  stroke: { width: 0.5 },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  stroke: {
    curve: 'smooth',
    width: 1.25,
  },
  tooltip: { enabled: false },
  responsive: [{
    breakpoint: 1000000, 
    options: {
      chart: {
        width: '40%', 
        height: '30%',
      },
    },
  }],
});

const getChartOptions = (priceChange) => {
  return {
    ...chartOptions.value,
    colors: [priceChange >= 0 ? '#01B130' : '#CB0101']
  }
}

const formatSparklineData = (priceData) => {
  return [{
    name: 'Price',
    data: priceData
  }];
};
</script>

<style>

</style>