<script setup lang="ts">
defineProps<{
  severity: (typeof SEVERITY_LEVELS)[number] | 'deprecated'
  pkg: PackageDependencyInfo
}>()

defineSlots<{
  info: () => unknown
  default: () => unknown
}>()
</script>

<template>
  <component
    is="li"
    class="px-4 py-3 border-is-2"
    :class="{
      'border-is-yellow-400': severity === 'low',
      'border-is-orange-500': severity === 'moderate',
      'border-is-red-600': severity === 'high',
      'border-is-red-800': severity === 'critical',
      'border-is-purple-600': severity === 'deprecated',
    }"
  >
    <div class="flex items-center justify-between gap-2 mb-2">
      <div class="flex items-center gap-2 min-w-0 relative">
        <DependencyPathPopup v-if="pkg.path && pkg.path.length > 1" :path="pkg.path" />
        <LinkBase
          :to="packageRoute(pkg.name, pkg.version)"
          class="font-mono text-sm font-medium hover:underline truncate shrink min-w-0"
          :class="pkg.depth === 'root' ? 'text-fg' : 'text-fg-muted'"
        >
          {{ pkg.name }}@{{ pkg.version }}
        </LinkBase>
      </div>
      <slot name="info" />
    </div>
    <slot name="default" />
  </component>
</template>
