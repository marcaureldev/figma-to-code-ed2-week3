<script setup lang="ts">
import type { NewsArticle } from '~/types/news'

const props = defineProps<{ article: NewsArticle }>()

const meta = computed(() => {
  const { category, timeAgo } = props.article
  const topic = category.charAt(0).toUpperCase() + category.slice(1)

  return `${topic} - ${timeAgo}`
})

const imageFailed = ref(false)
const hasImage = computed(
  () => Boolean(props.article.imageUrl) && !imageFailed.value,
)

const iconFailed = ref(false)

const sourceIcon = computed(() => {
  if (iconFailed.value) return null

  try {
    const { hostname } = new URL(props.article.url)
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`
  } catch {
    return null
  }
})

const sourceInitial = computed(() =>
  props.article.source.charAt(0).toUpperCase(),
)
</script>

<template>
  <article>
    <a
      :href="article.url"
      target="_blank"
      rel="noopener noreferrer"
      class="flex h-full flex-col gap-2.5 rounded-xl border border-tokena-light-gray bg-white p-2.5 transition-colors hover:border-tokena-gray dark:border-tokena-gray/15 dark:bg-tokena-dark-blue-1 dark:hover:border-tokena-gray/30"
    >
      <div class="flex items-center gap-2">
        <img
          v-if="sourceIcon"
          :src="sourceIcon"
          alt=""
          width="32"
          height="32"
          class="size-8 shrink-0 rounded-full bg-tokena-light-gray object-cover dark:bg-tokena-dark-blue-2"
          loading="lazy"
          @error="iconFailed = true"
        />
        <span
          v-else
          class="grid size-8 shrink-0 place-items-center rounded-full bg-tokena-light-gray text-xs font-semibold text-tokena-dark-gray dark:bg-tokena-dark-blue-2 dark:text-tokena-gray"
          aria-hidden="true"
          >{{ sourceInitial }}</span
        >
        <div class="min-w-0 flex-1 text-xs leading-4">
          <p
            class="truncate font-semibold text-tokena-dark dark:text-tokena-light-gray"
          >
            {{ article.source }}
          </p>
          <p
            class="truncate font-normal text-tokena-dark-gray dark:text-tokena-gray"
          >
            {{ meta }}
          </p>
        </div>
      </div>

      <img
        v-if="hasImage"
        :src="article.imageUrl!"
        alt=""
        class="aspect-[319/194] w-full rounded-[10px] bg-tokena-light-gray object-cover dark:bg-tokena-dark-blue-2"
        loading="lazy"
        @error="imageFailed = true"
      />
      <div
        v-else
        class="aspect-[319/194] w-full rounded-[10px] bg-tokena-light-gray dark:bg-tokena-dark-blue-2"
      ></div>

      <div class="flex flex-1 flex-col gap-1.5">
        <h3
          class="text-xs font-semibold italic leading-4 text-tokena-dark dark:text-tokena-light-gray"
        >
          {{ article.title }}
        </h3>
        <p
          v-if="article.excerpt"
          class="text-xs font-medium leading-4 text-tokena-dark-gray dark:text-tokena-gray"
        >
          {{ article.excerpt }}
        </p>
      </div>
    </a>
  </article>
</template>
