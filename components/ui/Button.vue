<script setup lang="ts">
import type { IconName } from '~/components/ui/icons'

type ButtonVariant = 'primary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    /** `sm` is the 36px control of the top bar, `md` the 40px one of the cards. */
    size?: ButtonSize
    icon?: IconName
    iconPosition?: 'left' | 'right'
    /** Renders a NuxtLink instead of a button. */
    to?: string
    type?: 'button' | 'submit'
  }>(),
  { variant: 'primary', size: 'sm', iconPosition: 'left', type: 'button' },
)

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'border-tokena-blue bg-tokena-blue text-white hover:bg-tokena-dark-2',
  outline:
    'border-tokena-gray bg-white text-tokena-dark hover:bg-tokena-light-gray '
    + 'dark:border-tokena-dark-gray dark:bg-tokena-dark-blue-1 dark:text-tokena-light-gray dark:hover:bg-tokena-dark-blue-2',
  ghost:
    'border-white bg-tokena-blue/[0.06] text-tokena-blue hover:bg-tokena-blue/[0.14] '
    + 'dark:border-transparent dark:bg-tokena-blue/[0.14] dark:hover:bg-tokena-blue/[0.22]',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9',
  md: 'h-10',
}

const classes = computed(() => `${VARIANTS[props.variant]} ${SIZES[props.size]}`)
</script>

<template>
  <component
    :is="to ? resolveComponent('NuxtLink') : 'button'"
    :to="to"
    :type="to ? undefined : type"
    class="inline-flex items-center justify-center gap-1.5 rounded-[10px] border px-5 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60"
    :class="classes"
  >
    <UiIcon v-if="icon && iconPosition === 'left'" :name="icon" />
    <span class="whitespace-nowrap"><slot /></span>
    <UiIcon v-if="icon && iconPosition === 'right'" :name="icon" />
  </component>
</template>
