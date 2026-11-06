<script setup lang="ts">
import type { IconClass } from '~/types/icon'
export type CalloutVariant = 'none' | 'info' | 'warning' | 'danger' | 'notice'

withDefaults(
  defineProps<{
    variant: CalloutVariant
    /** @default 'block' */
    type?: 'block' | 'accordion'
    /** A custom icon to use, or `false` to disable icon rendering. */
    icon?: IconClass | false
    /** @default 'md' */
    size?: 'sm' | 'md'
  }>(),
  { type: 'block', icon: undefined, size: 'md' },
)

defineSlots<{
  'default': () => unknown
  'title'?: () => unknown
  'accordion-label'?: () => unknown
}>()

const [DefineHeader, ReuseHeader] = createReusableTemplate()
const [DefineBody, ReuseBody] = createReusableTemplate()
</script>

<template>
  <DefineHeader>
    <span v-if="icon !== false" class="icon" :class="icon" aria-hidden="true" />
    <div v-if="$slots.title" class="title">
      <slot name="title" />
    </div>
  </DefineHeader>
  <DefineBody>
    <div class="body">
      <slot />
    </div>
  </DefineBody>

  <aside role="note" :data-variant="variant" :data-type="type" :data-size="size">
    <details v-if="type === 'accordion'">
      <summary>
        <ReuseHeader />
        <div v-if="$slots['accordion-label']" class="accordion-label">
          <slot name="accordion-label" />
        </div>
        <span class="accordion" />
      </summary>
      <ReuseBody />
    </details>
    <template v-else>
      <ReuseHeader />
      <ReuseBody />
    </template>
  </aside>
</template>

<style scoped>
aside {
  @apply grid gap-row-1 border border-[--callout-border]/[--callout-border-opacity] rounded-lg px-3 py-2 overflow-clip;

  &[data-size='sm'] {
    @apply text-sm gap-col-1.5;
  }

  &[data-size='md'] {
    @apply text-base gap-col-2;
  }

  &[data-variant='none'] {
    --callout-border: var(--border);
    --callout-border-opacity: 100%;
    @apply bg-bg-subtle text-fg-muted;

    & :where(a:not(:hover, :focus-visible)) {
      @apply decoration-fg-muted;
    }

    & :where(code:not(pre code), pre) {
      @apply bg-bg-muted border-border;
    }
  }

  &[data-variant='info'] {
    --callout-border: theme('colors.blue.600');
    --callout-border-opacity: 30%;
    @apply bg-blue-500/10 text-blue-700 dark:text-blue-400;

    & :where(a:not(:hover, :focus-visible)) {
      @apply decoration-blue-500/60 dark:decoration-blue-400/50;
    }

    & :where(code:not(pre code), pre) {
      @apply bg-blue-800/10 dark:bg-blue-950/30 border-blue-700/20;
    }
  }

  &[data-variant='warning'] {
    --callout-border: theme('colors.amber.600');
    --callout-border-opacity: 40%;
    @apply bg-amber-500/10 text-amber-800 dark:text-amber-400;

    & :where(a:not(:hover, :focus-visible)) {
      @apply decoration-amber-600/60 dark:decoration-amber-400/50;
    }

    & :where(code:not(pre code), pre) {
      @apply bg-amber-800/10 dark:bg-amber-950/30 border-amber-700/20;
    }
  }

  &[data-variant='danger'] {
    --callout-border: theme('colors.red.400');
    --callout-border-opacity: 30%;
    @apply bg-red-500/8 text-red-800 dark:text-red-300;

    & :where(a:not(:hover, :focus-visible)) {
      @apply decoration-red-500/60 dark:decoration-red-400/50;
    }

    & :where(code:not(pre code), pre) {
      @apply bg-red-800/10 dark:bg-red-950/30 border-red-700/20;
    }
  }

  &[data-variant='notice'] {
    --callout-border: theme('colors.purple.600');
    --callout-border-opacity: 40%;
    @apply bg-purple-500/10 text-purple-700 dark:text-purple-400;

    & :where(a:not(:hover, :focus-visible)) {
      @apply decoration-purple-500/60 dark:decoration-purple-400/50;
    }

    & :where(code:not(pre code), pre) {
      @apply bg-purple-800/10 dark:bg-purple-950/30 border-purple-700/20;
    }
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

aside[data-type='accordion'] {
  @apply block p-0 @container/callout;

  & > details {
    & > summary {
      @apply grid gap-col-2 items-center cursor-pointer px-3 py-2;
      @apply rounded-md transition-colors duration-200 hover:bg-white/40 dark:hover:bg-white/10 focus-visible:outline-none! focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/70;
      grid-template-areas: 'icon title accordion-label accordion';
      grid-template-columns: max-content 1fr max-content max-content;
    }

    &[open] > summary {
      @apply rounded-none;
    }
  }
}

:where(.icon) {
  grid-area: icon;
  @apply size-1em!;

  :where([data-type='block']) & {
    margin-block-start: calc((1lh - 1em) / 2);
  }

  :where([data-variant='none'], [data-variant='info'], [data-variant='notice']) & {
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

.accordion-label {
  grid-area: accordion-label;
  @apply text-xs op-90 dark:op-80 hidden @md/callout:inline;
}

.accordion {
  grid-area: accordion;
  @apply i-lucide:chevron-down size-1em! transition-transform duration-200;

  details[open] & {
    @apply rotate-180;
  }
}

.body {
  grid-area: body;
  @apply flex flex-col gap-2;

  [data-size='sm'] & {
    @apply text-xs;
  }
}
</style>
