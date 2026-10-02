<script setup lang="ts">
useHead({ title: 'News — Tokena' })

const { articles, hasMore, loadMore, isLoadingMore, loadMoreError, isLoading, error, refresh } = useNews()

/** 429 means the provider throttled us, which is worth saying plainly. */
const isRateLimited = computed(() => error.value?.statusCode === 429)

const SKELETON_COUNT = 8
</script>

<template>
  <div class="space-y-5">
    <h1 class="text-lg font-semibold text-tokena-dark dark:text-tokena-light-gray">Latest crypto news</h1>

    <div v-if="isLoading" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <NewsCardSkeleton v-for="index in SKELETON_COUNT" :key="index" />
    </div>

    <div v-else-if="articles.length" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <NewsCard v-for="article in articles" :key="article.id" :article="article" />
    </div>

    <UiCard v-else-if="error">
      <UiEmptyState
        icon="news"
        :title="isRateLimited ? 'The news provider is throttling us' : 'The news feed is unavailable'"
        :description="isRateLimited
          ? 'Too many requests went out in a short window. It usually clears within the hour.'
          : 'We could not reach the provider. This is usually temporary.'"
        action-label="Try again"
        @action="refresh"
      />
    </UiCard>

    <UiCard v-else>
      <UiEmptyState
        icon="news"
        title="No stories right now"
        description="The feed came back empty. Check again in a few minutes."
        action-label="Refresh"
        @action="refresh"
      />
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
