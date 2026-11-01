<script setup lang="ts">
import type { IconClass } from '~/types/icon'

withDefaults(
  defineProps<{
    variant: 'info' | 'warning' | 'danger'
    /** A custom icon to use, or `false` to disable icon rendering. */
    icon?: IconClass | false
    /** @default "md" */
    size?: 'sm' | 'md'
  }>(),
  { size: 'md' },
)

defineSlots<{
  default: () => unknown
  title?: () => unknown
}>()
</script>

<template>
  <aside role="note" :data-variant="variant" :data-size="size">
    <span v-if="icon !== false" class="icon" :class="icon" aria-hidden="true" />
    <div v-if="$slots.title" class="title">
      <slot name="title" />
    </div>
    <div class="body">
      <slot />
    </div>
  </aside>
</template>

<style scoped>
aside {
  @apply grid gap-row-1 border rounded-lg px-3 py-2;

  &[data-variant='info'] {
    @apply bg-blue-500/10 border border-blue-600/30 text-blue-700 dark:text-blue-400;
  }

  &[data-variant='warning'] {
    @apply border-amber-600/40 bg-amber-500/10 text-amber-800 dark:text-amber-400 decoration-amber-600/60 dark:decoration-amber-400/50;
  }

  &[data-variant='danger'] {
    @apply border-red-400/20 bg-red-500/8 text-red-800 dark:text-red-300;
  }

  &[data-size='sm'] {
    @apply text-sm gap-col-1.5;
  }

  &[data-size='md'] {
    @apply text-base gap-col-2;
  }

  &:has(.icon, .title) {
    grid-template-areas:
      'icon title'
      'body body';
    grid-template-columns: max-content minmax(0, 1fr);
  }

  &:has(.icon):not(:has(.title)) {
    grid-template-areas: 'icon body';
    grid-template-columns: max-content minmax(0, 1fr);
  }

  &:has(.title):not(:has(.icon)) {
    grid-template-areas:
      'title'
      'body';
    grid-template-columns: minmax(0, 1fr);
  }

  &:not(:has(.icon, .title)) {
    grid-template-areas: 'body';
    grid-template-columns: minmax(0, 1fr);
  }
}

.icon {
  grid-area: icon;
  margin-block-start: calc((1lh - 1rem) / 2);

  [data-variant='info'] & {
    @apply i-lucide:info;
  }

  [data-variant='warning'] & {
    @apply i-lucide:triangle-alert;
  }

  [data-variant='danger'] & {
    @apply i-lucide:octagon-alert;
  }

  [data-size='sm'] & {
    @apply size-3;
  }

  [data-size='md'] & {
    @apply size-4;
  }
}

.title {
  grid-area: title;
  @apply font-medium;
}

.body {
  grid-area: body;

  [data-size='sm'] & {
    @apply text-xs;
  }
}
</style>
