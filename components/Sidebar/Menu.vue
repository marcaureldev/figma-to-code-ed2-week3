<template>
    <div class="space-y-3">
        <header class="flex items-center gap-2 p-3 hover:scale-[101%] transition cursor-pointer bg-tokena-dark-2
            bg-opacity-[7%] w-52 mt- mx-5 lg:mx-auto rounded-md">
            <img src="/icons/logo.svg" alt="Logo" />
            <div  class="text-tokena-blue">
                <p class="text-lg font-medium">Tokena</p>
                <p class="text-xs">Finance app</p>
            </div>
        </header>

        <div class="px-4 grow">
            <div class="grid gap-3">
                <NuxtLink :to="item.path" v-for="(item, index) in items" :key="index"
                    class="flex items-center gap-2 px-4 py-1 transition rounded cursor-pointer hover:bg-neutral-100">
                    <img :src="item.icon" :alt="item.title" />
                    <span>{{ item.title }}</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>


<script setup>
const items = ref([
    {
        title: "Dashboard",
        path: "/",
        icon: "/icons/home.svg",
    },
    {
        title: "News",
        path: "/news",
        icon: "/icons/news-icon.svg",
    },
    {
        title: "Activities",
        path: "/activities",
        icon: "/icons/chart-icon.svg",
    },
    {
        title: "Cards",
        path: "/cards",
        icon: "/icons/credit-card-icon.svg",
    },
    {
        title: "Reports",
        path: "/reports",
        icon: "/icons/reports-icon.svg",
    },
    {
        title: "Notifications",
        path: "/notifications",
        icon: "/icons/bell-icon.svg",
    },
    {
        title: "Billing",
        path: "/billing",
        icon: "/icons/news-icon.svg",
    },
    {
        title: "Invoices",
        path: "/invoices",
        icon: "/icons/invoice-icon.svg",
    },
    {
        title: "Help center",
        path: "/help",
        icon: "/icons/headphone-icon.svg",
    },
    {
        title: "Settings",
        path: "/settings",
        icon: "/icons/settings-icon.svg",
    },
]);
</script>

<style></style>