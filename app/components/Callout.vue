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

  &[data-size='sm'] {
    @apply text-sm gap-col-1.5;
  }

  &[data-size='md'] {
    @apply text-base gap-col-2;
  }

  &[data-variant='info'] {
    @apply border-blue-600/30 bg-blue-500/10 text-blue-700 dark:text-blue-400;

    & :where(a:not(:hover, :focus-visible)) {
      @apply decoration-blue-500/60 dark:decoration-blue-400/50;
    }

    & :where(code:not(pre code), pre) {
      @apply bg-blue-800/10 dark:bg-blue-950/30 border-blue-700/20;
    }
  }

  &[data-variant='warning'] {
    @apply border-amber-600/40 bg-amber-500/10 text-amber-800 dark:text-amber-400;

    & :where(a:not(:hover, :focus-visible)) {
      @apply decoration-amber-600/60 dark:decoration-amber-400/50;
    }

    & :where(code:not(pre code), pre) {
      @apply bg-amber-800/10 dark:bg-amber-950/30 border-amber-700/20;
    }
  }

  &[data-variant='danger'] {
    @apply border-red-400/20 bg-red-500/8 text-red-800 dark:text-red-300;
  }

  /* Header: icon and title */
  &:has(.icon, .title) {
    grid-template-areas:
      'icon title'
      'body body';
    grid-template-columns: max-content minmax(0, 1fr);
  }

  /* Header: icon only */
  &:has(.icon):not(:has(.title)) {
    grid-template-areas: 'icon body';
    grid-template-columns: max-content minmax(0, 1fr);

    &[data-size='sm'] {
      @apply text-xs;
    }
  }

  /* Header: title only */
  &:has(.title):not(:has(.icon)) {
    grid-template-areas:
      'title'
      'body';
    grid-template-columns: minmax(0, 1fr);
  }

  /* Body only */
  &:not(:has(.icon, .title)) {
    grid-template-areas: 'body';
    grid-template-columns: minmax(0, 1fr);
  }
}

:where(.icon) {
  grid-area: icon;
  margin-block-start: calc((1lh - 1em) / 2);
  @apply size-1em!;

  :where([data-variant='info']) & {
    @apply i-lucide:info;
  }

  :where([data-variant='warning']) & {
    @apply i-lucide:triangle-alert;
  }

  :where([data-variant='danger']) & {
    @apply i-lucide:octagon-alert;
  }
}

.title {
  grid-area: title;
  @apply font-medium;
}

.body {
  grid-area: body;
  @apply flex flex-col gap-2;

  [data-size='sm'] & {
    @apply text-xs;
  }
}
</style>
