<script setup lang="ts" generic="T extends PackageDependencyInfo">
import type { CalloutSeverity } from '../Callout.vue'

export type DependencySeverity = (typeof SEVERITY_LEVELS)[number] | 'deprecated'

const props = defineProps<{
  severity: DependencySeverity
  packages: T[]
  getSeverity: (pkg: T) => DependencySeverity
  title: string
  label?: string
  expand: string
}>()

defineSlots<{
  'item': (props: { pkg: T }) => unknown
  'item-info'?: (props: { pkg: T }) => unknown
  'default': () => unknown
}>()

const {
  visibleItems: visiblePackages,
  hasMore: hasMorePackages,
  expand: expandPackages,
} = useVisibleItems(() => props.packages ?? [], 5)

const SEVERITY_MAP = {
  low: 'info',
  moderate: 'warning',
  high: 'danger',
  critical: 'danger',
  deprecated: 'notice',
} as const satisfies Record<DependencySeverity, CalloutSeverity>
</script>

<template>
  <Callout variant="accordion" :severity="SEVERITY_MAP[severity]">
    <template #title>
      <p>{{ title }}</p>
    </template>
    <template v-if="label" #accordionLabel>
      <p>{{ label }}</p>
    </template>
    <div>
      <ul
        class="border-t border-[--callout-border]/[--callout-border-opacity] divide-y divide-[--callout-border]/[--callout-border-opacity] list-none"
      >
        <PackageDependencyTreeItem
          v-for="pkg in visiblePackages"
          :key="`${pkg.name}@${pkg.version}`"
          :pkg="pkg"
          :severity="getSeverity(pkg)"
        >
          <template #info>
            <slot name="item-info" :pkg="pkg" />
          </template>
          <slot name="item" :pkg="pkg" />
        </PackageDependencyTreeItem>
      </ul>
      <button
        v-if="hasMorePackages"
        type="button"
        class="w-full px-4 py-2 text-xs font-mono text-fg-muted border-t border-[--callout-border]/[--callout-border-opacity] cursor-pointer hover:text-fg hover:bg-white/40 dark:hover:bg-white/10 transition-colors duration-200"
        @click="expandPackages"
      >
        {{ expand }}
      </button>
      <slot />
    </div>
  </Callout>
</template>
