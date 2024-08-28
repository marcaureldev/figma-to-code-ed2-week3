<template>
	<div class="flex justify-between gap-4 w-full px-4">
		<div class="flex space-x-5">
			<div>
				<h1 class="text-sm sm:text-xl font-medium">Dashboard</h1>
				<p class="text-xs text-tokena-dark-gray text-wrap max-w-40">Welcome back, John Doe!</p>
			</div>
			<Button class="md:flex hidden" />
		</div>
		<div class="flex space-x-3 items-center">
			<button
				class="flex items-center text-xs sm:text-sm rounded-lg text-tokena-dark-gray border sm:px-4 px-3 py-2">
				USD <img src="/icons/up-down-chevron-icon.svg" alt="USD up'down chevron" class="w-3">
			</button>
			<button class="rounded-lg text-tokena-dark-gray border sm:px-4 px-2 py-2">
				<img src="/icons/moon-icon.svg" alt="USD up'down chevron">
			</button>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style></style>