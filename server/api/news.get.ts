import type {
  NewsArticle,
  NewsResponse,
  UpstreamArticle,
  UpstreamNewsResponse,
} from '~/types/news'

/**
 * cryptocurrency.cv aggregates 358 feeds, most of which are not newsrooms:
 * central-bank speeches, a general finance wire, protocol marketing blogs and
 * user-submitted chart setups. Its `category` field does not separate them —
 * a sports podcast arrives tagged `bitcoin` — so the feed is filtered by
 * source instead, which is the only field that reliably tracks editorial
 * origin. Measured over 100 articles, this keeps 22% of them, 91% of which
 * carry artwork.
 */
const CRYPTO_NEWSROOMS = new Set([
  'BeInCrypto',
  'Bitcoin Magazine',
  'Bitcoin.com News',
  'Bitcoinist',
  'Blockhead',
  'Blockworks',
  'CoinCentral',
  'CoinDesk',
  'CoinJournal',
  'CoinPost (EN)',
  'CoinTelegraph',
  'Coinlive',
  'Coinspeaker',
  'Crypto Briefing',
  'Crypto Daily',
  'Crypto-News Flash',
  'CryptoGlobe',
  'CryptoNewsZ',
  'CryptoSlate',
  'Cryptopolitan',
  'Decrypt',
  'Forkast News',
  'InsideBitcoins',
  'NewsBTC',
  'Protos',
  'The Block',
  'The Daily Hodl',
  'The Defiant',
  'TheCryptoBasic',
  'TheNewsCrypto',
  'U.Today',
  'Unchained Crypto',
  'Watcher Guru',
])

/** Longest excerpt a news card can show before it is visually truncated anyway. */
const MAX_EXCERPT = 180

/** Enough to fill the News grid; filtering can empty an upstream page. */
const MIN_ARTICLES = 8

/**
 * Ceiling on upstream requests per call, so one page view cannot fan out.
 * Filtering yields roughly four articles per upstream page, so filling the
 * grid normally costs two.
 */
const MAX_UPSTREAM_FETCHES = 2

/**
 * How long a page of the feed is reused.
 *
 * The provider advertises generous limits but enforces them: hammering it
 * returns 403 REPEAT_RATE_LIMIT_ABUSE with a retry window of roughly an hour.
 * Since every server render would otherwise call upstream afresh, responses
 * are cached and shared across visitors.
 */
const CACHE_SECONDS = 60 * 5

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

/**
 * Many feeds append a syndication footer — "The post <title> appeared first
 * on <publication>." — which is boilerplate, not part of the story.
 */
const stripSyndicationFooter = (value: string): string =>
  value.replace(/\s*The post\b[\s\S]*$/i, '').trim()

/** Keep only genuine, on-topic articles that have enough to render a card. */
const isPublishable = (article: UpstreamArticle): boolean =>
  article.contentType === 'news'
  && CRYPTO_NEWSROOMS.has(article.source)
  && Boolean(article.title?.trim())
  && Boolean(article.link?.trim())

const normalise = (article: UpstreamArticle): NewsArticle => {
  const excerpt = article.description
    ? stripSyndicationFooter(toPlainText(article.description))
    : ''

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

const fetchUpstreamPage = async (
  baseUrl: string,
  timeoutMs: number,
  page: number,
): Promise<UpstreamNewsResponse> =>
  $fetch<UpstreamNewsResponse>(`${baseUrl}/news`, {
    query: { page },
    headers: { 'User-Agent': 'Tokena/1.0 (+https://github.com/marcaureldev)' },
    timeout: timeoutMs,
  })

/** The provider answers 403 once it has throttled a caller, 429 while doing so. */
const isRateLimited = (cause: unknown): boolean => {
  const status = (cause as { statusCode?: number, status?: number })?.statusCode
    ?? (cause as { status?: number })?.status

  return status === 403 || status === 429
}

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
export default defineCachedEventHandler(async (event): Promise<NewsResponse> => {
  const config = useRuntimeConfig(event)
  const baseUrl = config.newsApiBase
  const timeoutMs = Number(config.newsRequestTimeoutMs) || 10_000

  const startPage = Math.max(1, Number(getQuery(event).page) || 1)

  const collected: NewsArticle[] = []
  const seen = new Set<string>()

  let currentPage = startPage
  let feedHasMore = false
  let fetchedAt: string | undefined

  for (let attempt = 0; attempt < MAX_UPSTREAM_FETCHES; attempt += 1) {
    let payload: UpstreamNewsResponse

    try {
      payload = await fetchUpstreamPage(baseUrl, timeoutMs, currentPage)
    }
    catch (cause) {
      // A later page failing still leaves us with something worth showing.
      if (collected.length > 0) break

      throw createError({
        statusCode: isRateLimited(cause) ? 429 : 502,
        statusMessage: isRateLimited(cause)
          ? 'The news provider is rate limiting us'
          : 'Could not reach the news provider',
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
}, {
  name: 'news',
  maxAge: CACHE_SECONDS,
  getKey: event => `page-${Math.max(1, Number(getQuery(event).page) || 1)}`,
})
