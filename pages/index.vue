<template>
  <div class="space-y-5 px-4">
   <div class="space-y-4 sticky">
    <Navbar class="hidden lg:flex" />
    <hr>
   </div>
    <div class="xl:flex items-end xl:space-x-5 space-y-4 xl:space-y-0">
      <div class="space-y-4 xl:max-w-72 border rounded-lg p-4">
        <div>
          <h2 class="text-lg font-semibold">Balance</h2>
          <div class="flex space-x-10">
            <p class="text-sm font-semibold text-tokena-dark">$63,755,200</p>
            <p class="text-xs">
              <span class="p-2 bg-tokena-green bg-opacity-[15%] text-xs text-tokena-green rounded-full max-w-2">+2.3%</span>
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
        <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
        </div>
      </div>
    </div>

    <Table></Table>
  </div>
</template>

<script>

</script>