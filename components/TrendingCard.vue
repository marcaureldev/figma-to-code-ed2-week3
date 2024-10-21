<script setup>
import { computed } from "vue";

const props = defineProps({
	trending: {
		type: Object,
		required: true,
	},
});

const background = computed(() => {
	return `url(${props.trending.item.thumb})`;
});

const truncateText = (text, maxLength) => {
	if (text.length > maxLength) {
		return text.slice(0, maxLength) + '...';
	}
	return text;
};

const pricePercent = props.trending.item.data.price_change_percentage_24h.aed;
</script>

<template>
	<div class="border p-3 xl:max-w-52 rounded-lg">
		<div class="flex space-x-3 justify-between items-start">
			<div class="flex space-x-2 ">
				<div class="w-9 h-9 rounded-full bg-cover bg-center" :style="{ backgroundImage: background }"></div>
				<div>
					<p class="text-xs font-bold text-nowrap">{{ truncateText(trending.item.name, 4) }}</p>
					<p class="text-xs">{{ trending.item.symbol }}</p>
				</div>
			</div>
			<span v-if="trending.item.data.price_change_percentage_24h.aed > 0"
				class="flex items-center p-1 bg-tokena-green font-semibold bg-opacity-[15%] text-xs text-tokena-green rounded-full">
				{{ pricePercent.toFixed(2) }}%
				<img src="/icons/trade-up-icon.svg" alt="Trade down icon" class="w-4" />
			</span>
			<span v-else
				class="flex items-center p-1 bg-tokena-red font-semibold bg-opacity-[15%] text-xs text-tokena-red rounded-full">
				{{ pricePercent.toFixed(2) }}%
				<img src="/icons/trade-down-icon.svg" alt="Trade down icon" class="w-4" />
			</span>
		</div>
		<div class="text-sm mt-4 text-tokena-dark-gray">
			<p class="font-bold">
				{{ trending.item.data.price.toFixed(2) }} {{ trending.item.symbol }}
			</p>
			<p>{{ trending.item.data.market_cap }}</p>
		</div>
	</div>
</template>
