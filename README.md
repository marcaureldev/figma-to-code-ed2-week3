# Tokena

A cryptocurrency dashboard built with Nuxt 3, implemented from a Figma mockup.
It shows live market data, trending coins, a per-coin overview panel and a
crypto news feed, in both a light and a dark theme.

## Screens

| Route   | Contents                                                     |
| ------- | ------------------------------------------------------------ |
| `/`     | Balance card, trending coins, and the paginated market table |
| `/news` | Crypto news feed, searchable, with pagination                |

Clicking a coin anywhere on the dashboard opens the coin overview panel: price
chart, description, favourite toggle and key market stats.

Any other address falls through to `error.vue`, which is themed like the rest
of the app and returns the real status code.

## Stack

- **Nuxt 3** with TypeScript in strict mode and typed pages
- **Tailwind CSS 3** via `@nuxtjs/tailwindcss`, with the Figma design tokens
  declared in `tailwind.config.ts`
- **`@nuxtjs/color-mode`** for the theme, following the system preference by
  default and persisted under the `tokena-color-mode` key
- **ApexCharts** through `vue3-apexcharts`, loaded client side only
- **Mona Sans**, self-hosted as a variable font from `public/fonts`
- **Prettier** with Tailwind class sorting, and **ESLint** through
  `@nuxt/eslint`, both enforced on commit by lint-staged

## Getting started

Requires Node 20 or newer. The project uses **pnpm**.

```bash
pnpm install
pnpm dev
```

The app is then served on `http://localhost:3000`.

No `.env` file is needed to run it: `nuxt.config.ts` carries a working default
for every setting. To override one, copy the template and edit it.

```bash
cp .env.example .env
```

| Variable                         | Purpose                                   |
| -------------------------------- | ----------------------------------------- |
| `NUXT_PUBLIC_COINGECKO_API_BASE` | CoinGecko host, read on client and server |
| `NUXT_NEWS_API_BASE`             | News provider host, read server side only |
| `NUXT_NEWS_REQUEST_TIMEOUT_MS`   | Timeout on the news provider, in ms       |

## Scripts

| Command             | What it does                     |
| ------------------- | -------------------------------- |
| `pnpm dev`          | Development server with HMR      |
| `pnpm build`        | Production build into `.output`  |
| `pnpm preview`      | Serves the production build      |
| `pnpm typecheck`    | `vue-tsc` over the whole project |
| `pnpm lint`         | ESLint over the whole project    |
| `pnpm lint:fix`     | ESLint with autofix              |
| `pnpm format`       | Prettier write                   |
| `pnpm format:check` | Prettier check, no writes        |

## Data sources

**CoinGecko** public API, called directly from the app:

- `/coins/markets` for the market table, with 7 day sparklines
- `/search/trending` for the trending cards
- `/coins/categories/list` for the category filter
- `/coins/{id}` and `/coins/{id}/market_chart` for the overview panel

CoinGecko rate limits anonymous callers, so a burst of reloads can return 429.
The composables surface that as an empty state rather than a crash.

**News** comes from `cryptocurrency.cv`, proxied by `server/api/news.get.ts`
rather than called from the browser. That route keeps the provider host server
side, filters the feed down to known crypto newsrooms, trims the excerpts, and
caches the result with `defineCachedEventHandler` in stale-while-revalidate
mode. The cache is not optional: the provider bans callers that hit it
repeatedly, and an uncached render issues several upstream requests.

## Project layout

```
components/
  coin/        Coin overview panel: shell, content and skeleton
  dashboard/   Balance, trending and market sections
  layout/      Sidebar, top nav, user profile, nav definition
  news/        News card and its skeleton
  ui/          Primitives: Button, Card, Select, Tooltip, Icon, Skeleton...
composables/   One composable per data concern, each returning safe defaults
illustrations/ Decorative SVG components, kept out of components/ on purpose
server/api/    Nitro routes, currently the cached news proxy
types/         Shapes of the upstream API payloads
utils/         Number, currency and text formatting helpers
scripts/       generate-icons.mjs, which rewrites components/ui/icons.ts
```

Icons are inlined into `components/ui/icons.ts` so every glyph inherits
`currentColor` from the surrounding text. That file is generated: edit the
source SVGs and run `node scripts/generate-icons.mjs`, do not edit it by hand.
It is excluded from both Prettier and ESLint for the same reason.

## Conventions

- `<script setup lang="ts">` sits above `<template>` in every component
- Components are resolved through Nuxt auto-imports, so the path prefixes the
  name: `components/ui/Icon.vue` is used as `<UiIcon>`
- `NuxtLink` is imported from `#components` when it is passed to `:is`, because
  `resolveComponent` inside a template expression yields a bare string and
  renders a dead element
- Composables always expose arrays and objects with defaults, never a raw
  `undefined`, so templates need no guards
- Illustrations sit in `illustrations/` at the root rather than under
  `components/`, so they are imported explicitly. That directory is listed in
  the Tailwind `content` globs: leave it out and the `stroke-*` and `fill-*`
  classes are purged from the production CSS, which looks fine in dev and
  renders an invisible drawing once built

## Known gaps

Some controls in the mockup have no screen behind them and are therefore
rendered but inert: "View more", the currency selector, Deposit and Withdraw,
Connect wallet, and the sidebar entries other than Dashboard and News.
