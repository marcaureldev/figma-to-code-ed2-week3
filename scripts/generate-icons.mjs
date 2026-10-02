/**
 * Regenerates `components/ui/icons.ts` from `public/icons/*.svg`.
 *
 * The design calls for the same glyph in an active, an inactive and a
 * dark-theme colour. Rather than ship one file per state, the painted strokes
 * and fills are swapped for `currentColor` so a single definition inherits
 * whatever colour its container sets.
 *
 * Run with: node scripts/generate-icons.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const ICONS_DIR = 'public/icons'
const OUTPUT = 'components/ui/icons.ts'

/** Brand marks and raster images are not monochrome, so they stay as files. */
const NOT_AN_ICON = new Set([
  'logo.svg', // the whole logo tile; the mark alone is tokena-mark.svg
  'avatar-john-icon.svg',
  'sui-token-icon.svg',
  'market-options-icons.svg', // exports as a complete button, rebuilt in markup
])

/** Colour variants that `currentColor` makes redundant. */
const REDUNDANT_VARIANTS = new Set([
  'home-white-icon.svg',
  'news-white-icon.svg',
  'home-icon.svg',
])

const toName = file => file.replace(/\.svg$/, '').replace(/-icons?$/, '')

const definitions = readdirSync(ICONS_DIR)
  .filter(file => file.endsWith('.svg'))
  .filter(file => !NOT_AN_ICON.has(file) && !REDUNDANT_VARIANTS.has(file))
  .sort()
  .map((file) => {
    const svg = readFileSync(join(ICONS_DIR, file), 'utf8')
    const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1]

    if (!viewBox) throw new Error(`${file} has no viewBox`)

    let body = svg
      .replace(/^[\s\S]*?<svg[^>]*>/, '')
      .replace(/<\/svg>\s*$/, '')
      .trim()

    // <defs> holds clip masks whose white rects are not visible colour.
    const defs = body.match(/<defs>[\s\S]*?<\/defs>/)?.[0]
    if (defs) body = body.replace(defs, '\0')

    body = body.replace(
      /(stroke|fill)="(#[0-9A-Fa-f]{3,8}|white|black)"/g,
      '$1="currentColor"',
    )

    if (defs) body = body.replace('\0', defs)

    return { name: toName(file), viewBox, body: body.replace(/\s*\n\s*/g, '') }
  })

const entries = definitions
  .map(({ name, viewBox, body }) =>
    `  ${JSON.stringify(name)}: {\n`
    + `    viewBox: ${JSON.stringify(viewBox)},\n`
    + `    body: ${JSON.stringify(body)},\n`
    + `  },`)
  .join('\n')

writeFileSync(OUTPUT, `/**
 * Icon artwork from the Tokena design system, inlined so every glyph inherits
 * its colour from the surrounding text.
 *
 * DO NOT EDIT BY HAND — run \`node scripts/generate-icons.mjs\` instead.
 */
export interface IconDefinition {
  viewBox: string
  body: string
}

export const icons = {
${entries}
} as const satisfies Record<string, IconDefinition>

export type IconName = keyof typeof icons
`)

console.log(`${definitions.length} icons written to ${OUTPUT}`)
console.log(definitions.map(d => d.name).join(', '))
