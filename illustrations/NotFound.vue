<script setup lang="ts">
// A magnifier held over a chart whose middle candle is an empty slot: the
// record the page was asking for is precisely the one that is not there.
// Purely decorative, so the heading next to it carries the meaning.
</script>

<template>
  <svg
    viewBox="0 0 180 130"
    fill="none"
    aria-hidden="true"
    focusable="false"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <!-- Handle first, so the lens outline draws over the joint. -->
    <path
      d="M111 91 L140 120"
      stroke-width="6"
      class="stroke-tokena-dark dark:stroke-tokena-light-gray"
    />
    <circle
      cx="76"
      cy="56"
      r="48"
      stroke-width="3"
      class="stroke-tokena-dark dark:stroke-tokena-light-gray"
    />

    <!-- The two candles that resolved. Bodies carry the page background so
         the wick does not show through them. -->
    <path d="M48 28 V82" stroke-width="2.5" class="stroke-tokena-blue" />
    <rect
      x="40"
      y="40"
      width="16"
      height="30"
      rx="3"
      stroke-width="2.5"
      class="fill-white stroke-tokena-blue dark:fill-tokena-dark-blue-1"
    />

    <path d="M104 34 V88" stroke-width="2.5" class="stroke-tokena-blue" />
    <rect
      x="96"
      y="46"
      width="16"
      height="30"
      rx="3"
      stroke-width="2.5"
      class="fill-white stroke-tokena-blue dark:fill-tokena-dark-blue-1"
    />

    <!-- The one that did not. It keeps no wick and runs taller than its
         neighbours, so the slot reads as a gap rather than a paler candle. -->
    <rect
      x="66"
      y="36"
      width="20"
      height="42"
      rx="5"
      stroke-width="2.5"
      stroke-dasharray="5 5"
      class="stroke-tokena-dark-gray"
    />
  </svg>
</template>
