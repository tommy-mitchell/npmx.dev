<script setup lang="ts">
import type { LicenseChangeResponse } from '~/composables/useLicenseChanges'

const props = defineProps<{
  change: LicenseChangeResponse['change']
}>()
</script>

<template>
  <Callout
    v-if="props.change"
    severity="warning"
    class="mt-1"
    :aria-label="$t('package.versions.license_change_help')"
  >
    <template #title>
      <p>{{ $t('package.versions.license_change_warning') }}</p>
    </template>
    <p>{{ $t('package.versions.license_change_record', props.change ?? {}) }}</p>
  </Callout>
</template>
