import type {
  NewsArticle,
  NewsResponse,
  UpstreamArticle,
  UpstreamNewsResponse,
} from '~/types/news'

const UPSTREAM = 'https://cryptocurrency.cv/api/v1/news'

/**
 * Upstream pins an Ethereum gas-price ticker to the top of every category.
 * It is a live reading, not an article.
 */
const EXCLUDED_SOURCES = new Set(['etherscan_gas'])

/**
 * The feed carries a general finance and politics wire alongside its crypto
 * coverage — US healthcare, equities, elections. These categories are where
 * that lands, and none of it belongs on a crypto dashboard.
 */
const EXCLUDED_CATEGORIES = new Set(['mainstream', 'macro', 'geopolitical', 'tradfi'])

/** Longest excerpt a news card can show before it is visually truncated anyway. */
const MAX_EXCERPT = 180

/** Enough to fill the News grid; filtering can empty an upstream page. */
const MIN_ARTICLES = 8

/** Ceiling on upstream requests per call, so one page view cannot fan out. */
const MAX_UPSTREAM_FETCHES = 3

const HTML_ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&nbsp;': ' ',
}

/**
 * Some feeds hand back escaped markup rather than prose. Decode the entities,
 * drop any tags that surface, and collapse the leftover whitespace.
 */
const toPlainText = (value: string): string =>
  value
    .replace(/&[a-z]+;|&#\d+;/gi, entity => HTML_ENTITIES[entity.toLowerCase()] ?? ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const truncate = (value: string, max: number): string =>
  value.length <= max ? value : `${value.slice(0, max).trimEnd()}…`

/** Keep only genuine, on-topic articles that have enough to render a card. */
const isPublishable = (article: UpstreamArticle): boolean =>
  article.contentType === 'news'
  && !EXCLUDED_SOURCES.has(article.sourceKey)
  && !EXCLUDED_CATEGORIES.has(article.category)
  && Boolean(article.title?.trim())
  && Boolean(article.link?.trim())

const normalise = (article: UpstreamArticle): NewsArticle => {
  const excerpt = article.description ? toPlainText(article.description) : ''

  return {
    // Upstream exposes no id; the article URL is its natural key.
    id: article.link,
    title: toPlainText(article.title),
    url: article.link,
    excerpt: truncate(excerpt, MAX_EXCERPT),
    publishedAt: article.pubDate,
    timeAgo: article.timeAgo,
    source: article.source,
    category: article.category,
    author: article.author?.trim() || null,
    imageUrl: article.imageUrl?.trim() || null,
  }
}

const fetchUpstreamPage = async (page: number): Promise<UpstreamNewsResponse> =>
  $fetch<UpstreamNewsResponse>(UPSTREAM, {
    query: { page },
    headers: { 'User-Agent': 'Tokena/1.0 (+https://github.com/marcaureldev)' },
    timeout: 10_000,
  })

/**
 * Serves the News page.
 *
 * Proxying rather than calling cryptocurrency.cv from the browser lets us
 * filter the feed's noise and normalise its field names in one place, so the
 * UI never depends on the provider's shape.
 *
 * Filtering can leave an upstream page nearly empty, so this walks forward
 * until it has enough articles to fill the grid, and reports where to resume.
 */
export default defineEventHandler(async (event): Promise<NewsResponse> => {
  const { page } = getQuery(event)
  const startPage = Math.max(1, Number(page) || 1)

  const collected: NewsArticle[] = []
  const seen = new Set<string>()

  let currentPage = startPage
  let feedHasMore = false
  let fetchedAt: string | undefined

  for (let attempt = 0; attempt < MAX_UPSTREAM_FETCHES; attempt += 1) {
    let payload: UpstreamNewsResponse

    try {
      payload = await fetchUpstreamPage(currentPage)
    }
    catch (cause) {
      // A later page failing still leaves us with something worth showing.
      if (collected.length > 0) break

      throw createError({
        statusCode: 502,
        statusMessage: 'Could not reach the news provider',
        cause,
      })
    }

    fetchedAt ??= payload.fetchedAt

    for (const article of payload.articles ?? []) {
      if (!isPublishable(article) || seen.has(article.link)) continue

      seen.add(article.link)
      collected.push(normalise(article))
    }

    feedHasMore = payload.pagination?.hasMore ?? false
    currentPage += 1

    if (collected.length >= MIN_ARTICLES || !feedHasMore) break
  }

  return {
    articles: collected,
    nextPage: feedHasMore ? currentPage : null,
    fetchedAt: fetchedAt ?? new Date().toISOString(),
  }
})
