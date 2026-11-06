<script setup lang="ts">
const props = defineProps<{
  packageName: string
  version: string
}>()

const { data: analysisData, status } = useDependencyAnalysis(
  () => props.packageName,
  () => props.version,
)

const deprecatedPackages = computed(() => analysisData.value?.deprecatedPackages ?? [])
const hasDeprecated = computed(() => deprecatedPackages.value.length > 0)
</script>

<template>
  <section v-if="status === 'success' && hasDeprecated" class="relative">
    <PackageDependencyTreeCallout
      severity="deprecated"
      icon="i-lucide:octagon-alert"
      :packages="deprecatedPackages"
      :title="$t('package.deprecated.tree_found', deprecatedPackages.length)"
      :expand="$t('package.deprecated.show_all', { count: deprecatedPackages.length })"
      :getSeverity="() => 'deprecated'"
    >
      <template #item="{ pkg }">
        <p class="text-xs text-fg-muted m-0 line-clamp-2">{{ pkg.message }}</p>
      </template>
    </PackageDependencyTreeCallout>
  </section>
</template>
