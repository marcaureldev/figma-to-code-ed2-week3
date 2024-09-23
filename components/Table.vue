<template>
  <div class="w-full overflow-hidden rounded-lg">
    <div class="overflow-x-auto" style="max-width: 100%;">
      <table v-if="marketLists" class="w-full divide-y divide-gray-200">
        <thead class="bg-tokena-gray text-tokena-dark">
          <tr>
            <td class="px-6 py-4 border-b p-2">#</td>
            <td class="px-6 py-4 border-b p-2">Coins</td>
            <td class="px-6 py-4 border-b p-2">Price</td>
            <td class="px-6 py-4 border-b p-2">24h</td>
            <td class="px-6 py-4 border-b p-2">24h Volume</td>
            <td class="px-6 py-4 border-b p-2">Market Cap</td>
            <td class="px-6 py-4 border-b p-2">Last 7 days</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in marketLists" :key="index" class="bg-white border-b hover:bg-gray-100">
            <td class="px-6 py-4">{{ item.market_cap_rank }}</td>
            <td class="py-5 text-sm font-bold p-1 whitespace-nowrap">
              <div class="flex items-center space-x-0.5">
                <img :src="item.image" :alt="item.name" class="w-6 h-6">
                <p class="flex items-center">{{ item.name }}-<span class="uppercase">{{ item.symbol
                    }}</span></p>
              </div>
            </td>
            <td class="py-5 p-2">${{ item.current_price.toLocaleString() }}</td>
            <td class="px-6 py-4 max-w-2 font-semibold text-xs text-center">
              <span :class="[
                'p-1 rounded-full text-xs font-semibold',
                item.price_change_percentage_24h < 0
                  ? 'bg-tokena-red bg-opacity-[15%] text-tokena-red max-w-2'
                  : 'bg-tokena-green bg-opacity-[15%] text-tokena-green max-w-2'
              ]">
                {{ item.price_change_percentage_24h.toFixed(2) }}%
              </span>
            </td>
            <td class="py-4 px-6">${{ item.total_volume.toLocaleString() }}</td>
            <td class="py-4 px-6">${{ item.market_cap_change_24h.toLocaleString() }}</td>
            <td class="py-5 p-2">
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
    breakpoint: 1000000, // Un nombre très élevé pour couvrir tous les cas
    options: {
      chart: {
        width: '40%', // Utilise toute la largeur disponible
        height: '30%', // Utilise toute la hauteur disponible
      },
    },
  }],
});

const getChartOptions = (priceChange) => {
  return {
    ...chartOptions.value,
    colors: [priceChange >= 0 ? '#01B130' : '#CB0101'] // Vert si positif, rouge si négatif
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
table {
  min-width: 1000px;
  /* Ajustez cette valeur selon vos besoins */
}
</style>