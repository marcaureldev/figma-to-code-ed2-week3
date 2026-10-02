/**
 * Shapes for the news feed.
 *
 * Upstream is cryptocurrency.cv, which needs no API key. Its payload is
 * normalised in `server/api/news.get.ts` so the UI never depends on the
 * provider's field names.
 */

/** A raw article exactly as cryptocurrency.cv returns it. */
export interface UpstreamArticle {
  title: string
  link: string
  description?: string
  pubDate: string
  source: string
  sourceKey: string
  category: string
  timeAgo: string
  author?: string
  authorSlug?: string
  contentType?: string
  imageUrl?: string
  credibility: number
  reputation: number
}

export interface UpstreamNewsResponse {
  articles: UpstreamArticle[]
  totalCount: number
  sources: unknown
  fetchedAt: string
}

/** The article shape the UI consumes. */
export interface NewsArticle {
  id: string
  title: string
  url: string
  excerpt: string
  publishedAt: string
  /** Pre-formatted relative time, e.g. "7 hours ago". */
  timeAgo: string
  source: string
  category: string
  author: string | null
  /** `null` when upstream has no artwork; the card shows a placeholder. */
  imageUrl: string | null
}

export interface NewsResponse {
  articles: NewsArticle[]
  fetchedAt: string
}
