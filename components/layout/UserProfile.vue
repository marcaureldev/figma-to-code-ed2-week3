<script setup lang="ts">
// Static for now: the design shows the signed-in user, and there is no auth yet.
const user = {
  name: 'John Doe',
  email: 'johndoe8@gmail.com',
  avatar: '/images/avatar-john.png',
}
</script>

<template>
  <button
    type="button"
    class="flex w-full items-center gap-2 rounded-[10px] bg-white p-2 text-left transition-colors hover:bg-tokena-light-gray dark:bg-tokena-dark-blue-2 dark:hover:bg-tokena-dark-blue-2/70"
  >
    <span class="flex min-w-0 flex-1 items-center gap-2">
      <img
        :src="user.avatar"
        :alt="user.name"
        width="40"
        height="40"
        class="size-10 shrink-0 rounded-full object-cover"
      />
      <span class="min-w-0 flex-1 text-xs leading-4">
        <span class="block font-medium text-tokena-dark dark:text-white">{{ user.name }}</span>
        <span class="block truncate text-tokena-dark-gray dark:text-tokena-gray/50">{{
          user.email
        }}</span>
      </span>
    </span>
    <UiIcon name="chevron-down" class="text-tokena-dark dark:text-tokena-light-gray" />
  </button>
</template>
