<template>
    <div class="relative rounded-lg overflow-x-auto">
        <table v-if="marketLists" class="table-fixed w-full text-start min-w-[750px]">
            <thead class="bg-tokena-gray text-tokena-dark">
                <tr>

                    <td class="py-2 border-b p-2 w-1/12">#</td>
                    <td class="py-2 border-b p-2 w-1/6">Coins</td>
                    <td class="py-2 border-b p-2 max-w-1/12">Price</td>
                    <td class="py-2 border-b p-2 max-w-1/12">24h</td>
                    <td class="py-2 border-b p-2 max-w-1/12">24h Volume</td>
                    <td class="py-2 border-b p-2 max-w-1/12">Market Cap</td>
                    <td class="py-2 border-b p-2 max-w-1/12">Last 7 days</td>
                </tr>
            </thead>
            <tbody class="bg-white">
                <tr class="py-1 text-sm" v-for="(item, index) in marketLists" :key="index">

                    <td class="py-5 border-b p-2">{{ item.market_cap_rank }}</td>
                    <td class="py-5 border-b text-sm font-bold p-1">
                        <div class="flex items-start space-x-0.5">
                            <img :src="item.image" :alt="item.name" class="w-5">
                            <p class="flex items-center">{{ item.name }}-<span class="uppercase">{{ item.symbol
                                    }}</span></p>
                        </div>
                    </td>
                    <td class="py-5 border-b p-2 w-1/12">${{ item.current_price }}</td>
                    <td class="py-5 border-b p-2 w-1/12">
                        <span v-if="item.price_change_percentage_24h < 0"
                            class="p-1 bg-tokena-red bg-opacity-[15%] max-w-2 font-semibold text-xs text-center text-tokena-red rounded-full">
                            {{ item.price_change_percentage_24h.toFixed(2) }}%
                        </span>
                        <span v-if="item.price_change_percentage_24h > 0"
                            class="p-1 bg-tokena-green bg-opacity-[15%] text-xs font-semibold text-tokena-green rounded-full max-w-2">
                            {{ item.price_change_percentage_24h.toFixed(2) }}%
                        </span>
                    </td>
                    <td class="py-5 border-b p-2 w-1/12">${{ item.total_volume }}</td>
                    <td class="py-5 border-b p-2 w-1/12">${{ item.market_cap_change_24h }}</td>
                    <td class="py-5 border-b border-r p-2 w-1/12"></td>
                </tr>
            </tbody>
        </table>


    </div>
</template>

<script setup>
const { data: marketLists } = await useFetch('https://api.coingecko.com/api/v3/coins/markets',
    {
        params: {
            vs_currency: 'usd',
            per_page: 10,
            page: 1,
        }
    }
)

</script>

<style>
@media (max-width: 640px) {
    table {
        min-width: 750px;
    }
}
</style>


<!-- {{ data.market_caps }}
        <div v-if="data">
           
            <ul>
                <li v-for="(point, index) in data.market_caps" :key="index">
                    Date: {{ new Date(point[0]).toLocaleDateString() }} - Market Cap: {{ point[1] }} USD
                </li>
            </ul>
        </div> -->