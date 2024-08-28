<template>
    <div class="relative rounded-lg overflow-x-auto">
        <table class="table-fixed w-full text-start min-w-[750px]">
            <thead class="bg-tokena-gray text-tokena-dark">
                <tr>
                    <td class="py-2 border-b border-l p-4"></td>
                    <td class="py-2 border-b p-4">#</td>
                    <td class="py-2 border-b p-4">Coins</td>
                    <td class="py-2 border-b p-4">Price</td>
                    <td class="py-2 border-b p-4">24h</td>
                    <td class="py-2 border-b p-4">24h Volume</td>
                    <td class="py-2 border-b p-4">Market Cap</td>
                    <td class="py-2 border-b p-4">Last 7 days</td>
                </tr>
            </thead>
            <tbody class="bg-white">
                <tr class="py-2">
                    <td class="py-2 border-b border-l p-4"><img src="/icons/favorite-icon.svg" alt="favorite icon"></td>
                    <td class="py-2 border-b p-4">{{ marketLists[0].market_cap_rank }}</td>
                    <td class="py-2 border-b text-sm font-bold p-2">
                        <div class="flex items-start space-x-1">
                            <img :src="marketLists[0].image" :alt="marketLists[0].name" class="w-5">
                            <p class="flex">{{ marketLists[0].name }}-<span class="uppercase">{{ marketLists[0].symbol
                                    }}</span></p>
                        </div>
                    </td>
                    <td class="py-2 border-b p-4">${{ marketLists[0].current_price }}</td>
                    <td class="py-2 border-b p-4">{{ marketLists[0].price_change_percentage_24h }}</td>
                    <td class="py-2 border-b p-4">${{ marketLists[0].total_volume }}</td>
                    <td class="py-2 border-b p-4">${{ marketLists[0].market_cap_change_24h }}</td>
                    <td class="py-2 border-b p-4"></td>
                </tr>

                <tr class="py-2">
                    <td class="py-2 border-b border-l p-4"><img src="/icons/favorite-icon.svg" alt="favorite icon"></td>
                    <td class="py-2 border-b p-4">{{ marketLists[1].market_cap_rank }}</td>
                    <td class="py-2 border-b text-sm font-bold p-2">
                        <div class="flex items-start">
                            <img :src="marketLists[1].image" :alt="marketLists[1].name" class="w-5">
                            <p class="flex">{{ marketLists[1].name }}-<span class="uppercase">{{ marketLists[1].symbol
                                    }}</span></p>
                        </div>
                    </td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                </tr>
                <tr class="py-2">
                    <td class="py-2 border-b border-l p-4"><img src="/icons/favorite-icon.svg" alt="favorite icon"></td>
                    <td class="py-2 border-b p-4">{{ marketLists[2].market_cap_rank }}</td>
                    <td class="py-2 border-b text-sm font-bold p-2">
                        <div class="flex items-start space-x-1">
                            <img :src="marketLists[2].image" :alt="marketLists[2].name" class="w-5">
                            <p class="flex">{{ marketLists[2].name }}-<span class="uppercase">{{ marketLists[2].symbol
                                    }}</span></p>
                        </div>
                    </td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                </tr>
                <tr class="py-2">
                    <td class="py-2 border-b border-l p-4"><img src="/icons/favorite-icon.svg" alt="favorite icon"></td>
                    <td class="py-2 border-b p-4">{{ marketLists[3].market_cap_rank }}</td>
                    <td class="py-2 border-b text-sm font-bold p-2">
                        <div class="flex items-start space-x-1">
                            <img :src="marketLists[3].image" :alt="marketLists[3].name" class="w-5">
                            <p class="flex">{{ marketLists[3].name }}-<span class="uppercase">{{ marketLists[3].symbol
                                    }}</span></p>
                        </div>
                    </td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                </tr>
                <tr class="py-2">
                    <td class="py-2 border-b border-l p-4"><img src="/icons/favorite-icon.svg" alt="favorite icon"></td>
                    <td class="py-2 border-b p-4">{{ marketLists[4].market_cap_rank }}</td>
                    <td class="py-2 border-b text-sm font-bold p-2">
                        <div class="flex items-start space-x-1">
                            <img :src="marketLists[4].image" :alt="marketLists[4].name" class="w-5">
                            <p class="flex">{{ marketLists[4].name }}-<span class="uppercase">{{ marketLists[4].symbol
                                    }}</span></p>
                        </div>
                    </td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                </tr>
                <tr class="py-2">
                    <td class="py-2 border-b border-l p-4"><img src="/icons/favorite-icon.svg" alt="favorite icon"></td>
                    <td class="py-2 border-b p-4">{{ marketLists[5].market_cap_rank }}</td>
                    <td class="py-2 border-b text-sm font-bold p-2">
                        <div class="flex items-start space-x-1">
                            <img :src="marketLists[5].image" :alt="marketLists[5].name" class="w-5">
                            <p class="flex">{{ marketLists[5].name }}-<span class="uppercase">{{ marketLists[5].symbol
                                    }}</span></p>
                        </div>
                    </td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                </tr>
                <tr class="py-2">
                    <td class="py-2 border-b border-l p-4"><img src="/icons/favorite-icon.svg" alt="favorite icon"></td>
                    <td class="py-2 border-b p-4">{{ marketLists[6].market_cap_rank }}</td>
                    <td class="py-2 border-b text-sm font-bold p-2">
                        <div class="flex items-start space-x-1">
                            <img :src="marketLists[6].image" :alt="marketLists[6].name" class="w-5">
                            <p class="flex">{{ marketLists[6].name }}-<span class="uppercase">{{ marketLists[6].symbol
                                    }}</span></p>
                        </div>
                    </td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                </tr>
                <tr class="py-2">
                    <td class="py-2 border-b border-l p-4"><img src="/icons/favorite-icon.svg" alt="favorite icon"></td>
                    <td class="py-2 border-b p-4">{{ marketLists[7].market_cap_rank }}</td>
                    <td class="capitalize py-2 border-b text-sm font-bold p-2">
                        <div class="flex items-start space-x-1">
                            <img :src="marketLists[7].image" :alt="marketLists[7].name" class="w-5">
                            <p class="flex">{{ marketLists[7].id }}<span class="uppercase">{{ marketLists[7].symbol
                                    }}</span></p>
                        </div>
                    </td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                </tr>
                <tr class="py-2">
                    <td class="py-2 border-b border-l p-4"><img src="/icons/favorite-icon.svg" alt="favorite icon"></td>
                    <td class="py-2 border-b p-4">{{ marketLists[8].market_cap_rank }}</td>
                    <td class="py-2 border-b text-sm font-bold p-2">
                        <div class="flex items-start space-x-1">
                            <img :src="marketLists[8].image" :alt="marketLists[8].name" class="w-5">
                            <p class="flex">{{ marketLists[8].name }}-<span class="uppercase">{{ marketLists[8].symbol
                                    }}</span></p>
                        </div>
                    </td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b border-r p-4"></td>
                </tr>
                <tr class="py-2">
                    <td class="py-2 border-b border-l p-4"><img src="/icons/favorite-icon.svg" alt="favorite icon"></td>
                    <td class="py-2 border-b p-4">{{ marketLists[9].market_cap_rank }}</td>
                    <td class="py-2 border-b text-sm font-bold p-2">
                        <div class="flex items-start space-x-1">
                            <img :src="marketLists[9].image" :alt="marketLists[9].name" class="w-5">
                            <p class="flex">{{ marketLists[9].name }}-<span class="uppercase">{{ marketLists[9].symbol
                                    }}</span></p>
                        </div>
                    </td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b p-4"></td>
                    <td class="py-2 border-b border-r p-4"></td>
                </tr>
            </tbody>
        </table>



        <!-- {{ data.market_caps }}
        <div v-if="data">
           
            <ul>
                <li v-for="(point, index) in data.market_caps" :key="index">
                    Date: {{ new Date(point[0]).toLocaleDateString() }} - Market Cap: {{ point[1] }} USD
                </li>
            </ul>
        </div> -->

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

const { data, error } = useMarketCapChart('bitcoin', 7);
console.log(data)

</script>

<style>
@media (max-width: 640px) {
    table {
        min-width: 750px;
    }
}
</style>