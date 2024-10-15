<template>
    <div class="max-w-screen-xl mx-auto grid lg:ml-56 lg:flex items-start">
        <div>
            <Asidebar />
        </div>
        <div class="space-y-4 overflow-hidden">
            <Navbar class="hidden lg:flex border-b p-6" />
            <div class="w-full py-4">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>