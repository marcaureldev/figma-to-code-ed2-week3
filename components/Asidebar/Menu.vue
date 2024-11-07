<template>
    <div class="space-y-3 mt-8 lg:mt-0">
        <header class="flex items-center gap-2 p-3 hover:scale-[101%] transition cursor-pointer bg-tokena-dark-2
            bg-opacity-[7%] w-52 mt- mx-5 lg:mx-auto rounded-md">
            <img src="/icons/logo.svg" alt="Logo" />
            <div class="text-tokena-blue">
                <p class="text-lg font-medium">Tokena</p>
                <p class="text-xs">Finance app</p>
            </div>
        </header>

        <div class="px-4 grow">
            <div class="grid gap-3 mt-4">
                <p class="text-lg text-tokena-dark-gray mb-4">Menu</p>
                <NuxtLink :to="item.path" v-for="(item, index) in items" :key="index"
                    class="flex items-center gap-2 px-4 py-1 transition rounded-lg cursor-pointer"
                    :class="{ 'bg-tokena-blue px-4 py-2.5 text-white': $route.path === item.path }">
                    <img :src="$route.path === item.path ? item.iconWhite : item.icon" :alt="item.title" class="w-6" />
                    <span>{{ item.title }}</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>


<script setup>
const route = useRoute()
const items = ref([
    {
        title: "Dashboard",
        path: "/",
        icon: "/icons/home.svg",
        iconWhite: "/icons/home-white-icon.svg",
    },
    {
        title: "News",
        path: "/news",
        icon: "/icons/news-icon.svg",
        iconWhite: "/icons/news-white-icon.svg",
    },
    {
        title: "Activities",
        icon: "/icons/chart-icon.svg",
    },
    {
        title: "Cards",
        icon: "/icons/credit-card-icon.svg",
    },
    {
        title: "Reports",
        icon: "/icons/reports-icon.svg",
    },
    {
        title: "Notifications",
        icon: "/icons/bell-icon.svg",
    },
    {
        title: "Billing",
        icon: "/icons/news-icon.svg",
    },
    {
        title: "Invoices",
        icon: "/icons/invoice-icon.svg",
    },
    {
        title: "Help center",
        icon: "/icons/headphone-icon.svg",
    },
    {
        title: "Settings",
        icon: "/icons/settings-icon.svg",
    },
]);
</script>

<style></style>