<script setup>
const { trendingInfo } = useTrendingInfo()

const trendingInfos = trendingInfo?.value?.coins.slice(0, 4)

console.log(trendingInfo)

</script>

<template>
  <div class="space-y-5 px-4">
    <div class="xl:flex items-end xl:space-x-5 space-y-4 xl:space-y-0">
      <div class="space-y-4 xl:max-w-72 border rounded-lg p-4">
        <div>
          <h2 class="text-lg font-semibold">Balance</h2>
          <div class="flex space-x-10">
            <p class="text-sm font-semibold text-tokena-dark">$63,755,200</p>
            <p class="text-xs">
              <span
                class="p-2 bg-tokena-green bg-opacity-[15%] text-xs text-tokena-green rounded-full max-w-2">+2.3%</span>
              vs last month
            </p>
          </div>
        </div>
        <div class="flex justify-between space-x-4">
          <button
            class="bg-tokena-dark-2 bg-opacity-[7%] text-tokena-blue w-full text-sm py-2 px-4 rounded-lg flex justify-center space-x-4 items-center">
            Deposit <img src="/icons/arrow-up-icon.svg" alt="" />
          </button>
          <button
            class="bg-tokena-dark-2 bg-opacity-[7%] text-tokena-blue w-full text-sm py-2 px-4 rounded-lg flex justify-center space-y-4 items-center">
            Withdraw <img src="/icons/arrow-down-icon.svg" alt="" />
          </button>
        </div>
      </div>

      <div>
        <h2 class="text-lg font-semibold mb-1">Trending</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <TrendingCard v-for="(trending, index) in trendingInfos" :key="index" :trending="trending" />
        </div>
      </div>
    </div>

    <div class="sm:flex space-y-5 sm:space-y-0 justify-between items-center py-4">
      <div class="flex space-x-2 items-center border-tokena-gray border p-2 rounded-lg w-72">
        <img src="/icons/search-icon.svg" alt="Search Icon">
        <input type="text" class="focus:outline-none" placeholder="Search">
      </div>

      <div class="flex space-x-2 items-center border-tokena-gray border p-2 rounded-lg w-60">
        <input type="text" class="focus:outline-none" placeholder="Categories">
      </div>
    </div>

    <Table></Table>

  </div>
</template>