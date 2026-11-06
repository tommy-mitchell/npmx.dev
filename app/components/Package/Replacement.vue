<script setup lang="ts">
import type { ModuleReplacement, ModuleReplacementMapping } from 'module-replacements'
import { resolveDocUrl } from 'module-replacements'
import { LinkBase } from '#components'
import { getReplacementDescription, getReplacementNodeVersion } from '~/utils/module-replacements'

const props = defineProps<{
  mapping: ModuleReplacementMapping
  replacement: ModuleReplacement
}>()

const externalUrl = computed(() => resolveDocUrl(props.mapping.url ?? props.replacement.url))

const nodeVersion = computed(() => getReplacementNodeVersion(props.replacement))

const replacementDescription = useMarkdown(() => ({
  text: getReplacementDescription(props.replacement),
}))
</script>

<template>
  <Callout
    :severity="replacement.type === 'native' ? 'warning' : 'info'"
    icon="i-lucide:lightbulb"
    data-testid="replacement-card"
  >
    <template v-slot:title>
      <p>{{ $t('package.replacement.title') }}</p>
    </template>
    <p>
      <i18n-t
        v-if="nodeVersion && replacement.type === 'native'"
        keypath="package.replacement.native"
        scope="global"
      >
        <template #replacement>
          <span v-if="replacementDescription" v-html="replacementDescription" />
          <span v-else>
            <code>{{ replacement.id }}</code>
          </span>
        </template>
        <template #nodeVersion>
          {{ nodeVersion }}
        </template>
      </i18n-t>
      <i18n-t
        v-else-if="replacement.type === 'native'"
        keypath="package.replacement.native_no_version"
        scope="global"
      >
        <template #replacement>
          <span v-if="replacementDescription" v-html="replacementDescription" />
          <span v-else>
            <code>{{ replacement.id }}</code>
          </span>
        </template>
      </i18n-t>
      <template v-else-if="replacement.type === 'documented'">
        {{ $t('package.replacement.documented') }}
      </template>
      <template v-else-if="replacement.type === 'removal' || replacement.type === 'simple'">
        <span v-html="replacementDescription" />
      </template>
      <template v-else>
        {{ $t('package.replacement.none') }}
      </template>
      {{ ' ' }}
      <LinkBase v-if="externalUrl" :to="externalUrl" class="text-inherit decoration-inherit">
        {{ $t('package.replacement.learn_more') }}
      </LinkBase>
    </p>
    <template v-if="replacement.type === 'simple' && replacement.example">
      <p>{{ $t('package.replacement.example') }}</p>
      <pre
        class="p-2 rounded border overflow-x-auto text-xs font-mono leading-relaxed"
      ><code>{{ replacement.example }}</code></pre>
    </template>
  </Callout>
</template>
