<script setup lang="ts">
import type { IconClass } from '~/types/icon'

interface Props {
  variant: 'info' | 'warning' | 'danger'
  /** A custom icon to use, or `false` to disable icon rendering. */
  icon?: IconClass | false
  /** @default "md" */
  size?: 'sm' | 'md'
}

withDefaults(defineProps<Props>(), { size: 'md' })

defineSlots<{
  default: () => unknown
  title?: () => unknown
}>()

const VARIANT_STYLES: Record<Props['variant'], string> = {
  info: 'bg-blue-500/10 border border-blue-600/30 text-blue-700 dark:text-blue-400',
  warning:
    'border-amber-600/40 bg-amber-500/10 text-amber-800 dark:text-amber-400 decoration-amber-600/60 dark:decoration-amber-400/50',
  danger: 'border-red-400/20 bg-red-500/8 text-red-800 dark:text-red-300', // text-red-700 dark:text-red-400
}

const ICON_VARIANT: Record<Props['variant'], IconClass> = {
  info: 'i-lucide:info',
  warning: 'i-lucide:triangle-alert',
  danger: 'i-lucide:octagon-alert',
}

const ICON_SIZES: Record<NonNullable<Props['size']>, string> = {
  sm: 'size-3',
  md: 'size-4',
}

const TITLE_CLASSES: Record<NonNullable<Props['size']>, string> = {
  sm: 'text-sm gap-col-1.5',
  md: 'text-base gap-col-2',
}

const BODY_CLASSES: Record<NonNullable<Props['size']>, string> = {
  sm: 'text-xs',
  md: '',
}
</script>

<style scoped>
aside {
  @apply grid gap-row-1;
}

aside.with-icon.with-title {
  grid-template-areas:
    'icon title'
    'body body';
  grid-template-columns: max-content minmax(0, 1fr);
}

aside.with-icon:not(.with-title) {
  grid-template-areas: 'icon body';
  grid-template-columns: max-content minmax(0, 1fr);
}

aside.with-title:not(.with-icon) {
  grid-template-areas:
    'title'
    'body';
  grid-template-columns: minmax(0, 1fr);
}

aside:not(.with-icon):not(.with-title) {
  grid-template-areas: 'body';
  grid-template-columns: minmax(0, 1fr);
}

.icon {
  grid-area: icon;
  margin-block-start: calc((1lh - 1rem) / 2);
}

.title {
  grid-area: title;
}

.body {
  grid-area: body;
}
</style>

<!-- TODO: add [variant] and [size] as data attributes to allow children to use -->
<template>
  <aside
    role="note"
    class="border rounded-lg px-3 py-2"
    :class="[
      VARIANT_STYLES[variant],
      TITLE_CLASSES[size],
      { 'with-icon': icon !== false, 'with-title': !!$slots.title },
    ]"
  >
    <span
      v-if="icon !== false"
      class="icon"
      :class="[icon ?? ICON_VARIANT[variant], ICON_SIZES[size]]"
      aria-hidden="true"
    />
    <div v-if="$slots.title" class="title font-medium">
      <slot name="title" />
    </div>
    <div class="body" :class="BODY_CLASSES[size]">
      <slot />
    </div>
  </aside>
</template>
