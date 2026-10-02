import type { NewsArticle, NewsResponse } from '~/types/news'

/**
 * Drives the News page.
 *
 * Articles accumulate across pages so "Load more" appends rather than
 * replaces. The list is shared `useState` so navigating away and back keeps
 * whatever the reader had already loaded.
 */
export const useNews = () => {
  const articles = useState<NewsArticle[]>('news:articles', () => [])
  const nextPage = useState<number | null>('news:next-page', () => null)

  const isLoadingMore = ref(false)
  const loadMoreError = ref<string | null>(null)

  const { error, status, refresh } = useAsyncData('news:feed', async () => {
    const response = await $fetch<NewsResponse>('/api/news', { query: { page: 1 } })

    articles.value = response.articles
    nextPage.value = response.nextPage

    return response
  })

  const hasMore = computed(() => nextPage.value !== null)

  const loadMore = async (): Promise<void> => {
    if (nextPage.value === null || isLoadingMore.value) return

    isLoadingMore.value = true
    loadMoreError.value = null

    try {
      const response = await $fetch<NewsResponse>('/api/news', {
        query: { page: nextPage.value },
      })

      // The feed shifts as stories are published, so the same article can
      // surface again on a later page.
      const alreadyShown = new Set(articles.value.map(article => article.id))
      const fresh = response.articles.filter(article => !alreadyShown.has(article.id))

      articles.value = [...articles.value, ...fresh]
      nextPage.value = response.nextPage
    }
    catch {
      loadMoreError.value = 'Could not load more articles. Please try again.'
    }
    finally {
      isLoadingMore.value = false
    }
  }

  return {
    articles,
    hasMore,
    loadMore,
    isLoadingMore,
    loadMoreError,
    isLoading: computed(() => status.value === 'pending'),
    error,
    refresh,
  }
}
