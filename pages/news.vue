<script setup lang="ts">
useHead({ title: 'News — Tokena' })

const { articles, hasMore, loadMore, isLoadingMore, loadMoreError, isLoading, error } = useNews()
</script>

<template>
  <div class="space-y-5">
    <h1 class="text-lg font-semibold text-tokena-dark dark:text-tokena-light-gray">Latest crypto news</h1>

    <div v-if="articles.length" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <NewsCard v-for="article in articles" :key="article.id" :article="article" />
    </div>

    <UiCard v-else-if="isLoading" class="p-8 text-center text-sm text-tokena-dark-gray dark:text-tokena-gray">
      Loading the latest stories…
    </UiCard>

    <UiCard v-else class="p-8 text-center text-sm text-tokena-dark-gray dark:text-tokena-gray">
      <template v-if="error">The news feed is unavailable right now. Please try again shortly.</template>
      <template v-else>No stories to show at the moment.</template>
    </UiCard>

    <p v-if="loadMoreError" class="text-center text-sm text-tokena-red">{{ loadMoreError }}</p>

    <div v-if="hasMore" class="flex justify-center pt-1">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-full border border-tokena-gray bg-tokena-light-gray px-5 py-2.5 text-sm font-medium text-tokena-dark transition-colors hover:bg-tokena-gray/40 disabled:cursor-not-allowed disabled:opacity-60 dark:border-tokena-dark-gray dark:bg-tokena-dark-blue-2 dark:text-tokena-light-gray dark:hover:bg-tokena-dark-blue-2/70"
        :disabled="isLoadingMore"
        @click="loadMore"
      >
        {{ isLoadingMore ? 'Loading…' : 'Load more' }}
        <UiIcon name="arrow-down" />
      </button>
    </div>
  </div>
</template>
