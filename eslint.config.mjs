// @nuxt/eslint generates .nuxt/eslint.config.mjs from the project's own
// structure, so auto-imports and component names resolve without extra setup.
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: [
      // Rewritten by scripts/generate-icons.mjs, not hand edited.
      'components/ui/icons.ts',
    ],
  },
  {
    rules: {
      // A leading underscore marks a binding kept for signature shape only.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // The design labels some sections with a bare noun, which reads fine
      // here because Nuxt prefixes component names with their folder anyway.
      'vue/multi-word-component-names': 'off',

      // Everything below is formatting, which Prettier owns. Leaving these on
      // makes the two tools rewrite each other's output on every commit.
      'vue/attributes-order': 'off',
      'vue/html-self-closing': 'off',

      // With `defineProps<{ x?: T }>()` the optional marker already states the
      // intent, and `undefined` is the default we want.
      'vue/require-default-prop': 'off',

      // Kept as an error so any new interpolation of raw markup has to be
      // justified at the call site. See components/ui/Icon.vue.
      'vue/no-v-html': 'error',
    },
  },
)
