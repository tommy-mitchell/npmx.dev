import DeprecatedTree from './DeprecatedTree.vue'
import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import {
  deprecatedTreeHandler,
  fewDeprecatedHandler,
  noDeprecatedHandler,
} from '../../storybook/mocks/handlers/deprecated'
import { serverErrorHandler } from '../../storybook/mocks/handlers/vulnerabilities'

const meta = {
  component: DeprecatedTree,
  beforeEach: ({ msw }) => msw.use(deprecatedTreeHandler),
  argTypes: {
    packageName: { control: false },
    version: { control: false },
  },
  args: {
    packageName: 'my-legacy-app',
    version: '1.0.0',
  },
} satisfies Meta<typeof DeprecatedTree>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FewDeprecated: Story = {
  beforeEach: ({ msw }) => msw.use(fewDeprecatedHandler),
}

export const NoDeprecated: Story = {
  beforeEach: ({ msw }) => msw.use(noDeprecatedHandler),
}

export const ScanFailed: Story = {
  beforeEach: ({ msw }) => msw.use(serverErrorHandler),
}
