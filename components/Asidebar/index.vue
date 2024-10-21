<template>
    <div>
        <div class="flex justify-between items-center p-4">
            <img src="/icons/burger-menu-icon.svg" alt="Burger-menu" @click="menuOpen" class="lg:hidden size-6">
            <Navbar class="lg:hidden" />
        </div>
        <!-- <div class="hidden lg:flex w-64 space-y-10 flex-col justify-between border-r">
            <SidebarMenu />
            <div>
                UserItem
            </div>
        </div> -->

        <div class="hidden py-8 lg:flex lg:flex-col  w-64 border-r h-full fixed top-0 left-0 z-30">
            <AsidebarMenu />
            <div class="mt-auto p-4">
                UserItem
            </div>
        </div>

        <div class="lg:static absolute top-0 w-full h-full bg-white duration-500 lg:duration-0 ease-out lg:hidden"
            :class="[open ? 'left-0' : 'left-[-100%]']">
            <AsidebarMenu />
            <img v-if="open" src="/icons/close-icon.svg" alt="Logo"
                class="absolute z-50 top-6 size-5 cursor-pointer right-4" @click="menuOpen" />
        </div>
    </div>
</template>

<script setup>
const open = ref(false);

const menuOpen = () => {
    open.value = !open.value
}

</script>

<style></style>