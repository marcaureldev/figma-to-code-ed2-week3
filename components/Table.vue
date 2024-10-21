<template>
  <div class="border-2 rounded-lg">
    <div class="flex justify-between items-center p-4">
      <p>Market</p>
      <img src="/icons/market-options-icons.svg" alt="Options icons" />
    </div>
    <div class="w-full overflow-x-auto">
      <table v-if="marketLists" class="w-full">
        <thead class="bg-tokena-gray text-tokena-dark">
          <tr class="whitespace-nowrap">
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
        <tbody class="text-sm whitespace-nowrap">
          <tr v-for="(item, index) in copyMarketList" :key="index" class="bg-white border-b hover:bg-gray-100">
            <td class="px-4 py-3" style="min-width: 50px;">
              <img src="/icons/star-icon.svg" alt="Star icon" />
            </td>
            <td class="px-4 py-3">{{ item.market_cap_rank }}</td>
            <td class="text-sm font-bold p-1 whitespace-nowrap max-w-xs truncate">
              <div class="flex items-center space-x-1">
                <img :src="item.image" :alt="item.name" class="w-6 h-6" />
                <p class="flex items-center">
                  {{ item.name }}-<span class="uppercase">{{ item.symbol }}</span>
                </p>
              </div>
            </td>

            <td class="py-3 p-2">${{ item.current_price.toLocaleString() }}</td>
            <td class="py-3 max-w-2 font-semibold text-xs text-center">
              <span :class="[
                'p-1 rounded-full text-xs font-semibold',
                item.price_change_percentage_24h < 0
                  ? 'bg-tokena-red bg-opacity-[15%] text-tokena-red max-w-2'
                  : 'bg-tokena-green bg-opacity-[15%] text-tokena-green max-w-2',
              ]">
                {{ item.price_change_percentage_24h.toFixed(2) }}%
              </span>
            </td>
            <td class="py-3">${{ item.total_volume.toLocaleString() }}</td>
            <td class="py-3">
              ${{ item.market_cap_change_24h.toLocaleString() }}
            </td>
            <td class="px-4 py-3">
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

  <div class="flex space-x-2 justify-center items-center">
    <!-- Bouton précédent -->
    <div class="flex items-center text-black rounded-lg px-4 py-2 cursor-pointer" @click="prev">
     <img src="/icons/previous-arrow-icon.svg" alt="Previous arrow icon"/>
    </div>

    <!-- Pages visibles avec gestion des pointillés -->
    <div v-for="(pageItem, index) in visiblePages" :key="index"
      class="flex items-center rounded-lg px-3 py-1.5 cursor-pointer text-tokena-blue"
      :class="{ 'bg-tokena-blue text-white': page === pageItem }" @click="navigate(pageItem)">
      <!-- Affiche les pages ou les pointillés -->
      <span>{{ pageItem }}</span>
    </div>

    <!-- Bouton suivant -->
    <div class="flex items-center text-black rounded-lg px-3 py-1.5 cursor-pointer" @click="next">
      <img src="/icons/next-arrow-icon.svg" alt="Next arrow icon" />
    </div>
  </div>


</template>

<script setup>
const { marketLists } = useMarketList();

const itemperpage = ref(10);
const page = ref(1);

// Calcul du nombre total de pages
const totalPages = computed(() =>
  Math.ceil(marketLists.value.length / itemperpage.value)
);

// Fonction pour découper la liste en fonction de la page actuelle
const copyMarketList = computed(() => {
  const start = itemperpage.value * (page.value - 1);
  const end = itemperpage.value * page.value;
  return marketLists.value.slice(start, end);
});

const visiblePages = computed(() => {
  const totalVisible = 2; // Nombre de pages visibles autour de la page actuelle
  const pages = [];
  
  // Toujours afficher la première page
  if (totalPages.value > 1) pages.push(1);
  
  // Si la page actuelle est suffisamment éloignée du début, afficher des points de suspension
  if (page.value > totalVisible + 2) {
    pages.push('...');
  }
  
  // Pages autour de la page actuelle
  const startPage = Math.max(2, page.value - totalVisible);
  const endPage = Math.min(totalPages.value - 1, page.value + totalVisible);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Si la page actuelle est suffisamment éloignée de la fin, afficher des points de suspension
  if (page.value < totalPages.value - totalVisible - 1) {
    pages.push('...');
  }

  // Toujours afficher la dernière page
  if (totalPages.value > 1) pages.push(totalPages.value);

  return pages;
});


const navigate = (clickedPage) => {
  if (clickedPage !== '...') {
    page.value = clickedPage;
  }
};

// Navigation entre les pages
const prev = () => {
  if (page.value > 1) {
    page.value--;
  }
};

const next = () => {
  if (page.value < totalPages.value) {
    page.value++;
  }
};

// Surveiller les changements de page et d'éléments par page
watch([page, itemperpage], () => {
  // Quand page ou itemperpage change, le computed `copyMarketList` est automatiquement mis à jour
});

const chartOptions = ref({
  chart: {
    type: "line",
    zoom: { enabled: false },
    toolbar: { show: false },
    sparkline: { enabled: true },
    width: "150px", // Fixe la largeur
    height: "50px", // Fixe la hauteur
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
    curve: "smooth",
    width: 1.25,
  },
  tooltip: { enabled: false },
  responsive: [
    {
      breakpoint: 1000000,
      options: {
        chart: {
          width: "100px",  // Largeur minimale fixée
          height: "50px",  // Hauteur minimale fixée
        },
      },
    },
  ],
});

const getChartOptions = (priceChange) => {
  return {
    ...chartOptions.value,
    colors: [priceChange >= 0 ? "#01B130" : "#CB0101"],
  };
};

const formatSparklineData = (priceData) => {
  return [
    {
      name: "Price",
      data: priceData,
    },
  ];
};
</script>

<style></style>
