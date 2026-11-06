import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import Callout from './Callout.vue'

const meta = {
  component: Callout,
  tags: ['autodocs'],
  argTypes: {
    'variant': {
      control: 'select',
      options: ['none', 'info', 'warning', 'danger', 'notice'],
    },
    'type': {
      control: 'select',
      options: ['block', 'accordion'],
    },
    'size': {
      control: 'select',
      options: ['sm', 'md'],
    },
    'icon': {
      control: 'text',
    },
    'default': {
      control: 'text',
    },
    'title': {
      control: 'text',
    },
    'accordion-label': {
      control: 'text',
    },
  },
  args: {
    variant: 'info',
    icon: undefined,
    title: 'Heads up',
    default: 'Something you might want to know about this package.',
  },
  render: args => ({
    components: { Callout },
    setup: () => ({ args }),
    template: `
      <Callout :variant="args.variant" :type="args.type" :icon="args.icon" :size="args.size">
        <template v-if="args.title" #title>{{ args.title }}</template>
        <template v-if="args['accordion-label']" #accordion-label>{{ args['accordion-label'] }}</template>
        {{ args.default }}
      </Callout>
    `,
  }),
} satisfies Meta<typeof Callout>

export default meta
type Story = StoryObj<typeof meta>

/** Info variant. */
export const Info: Story = {}

/** Warning variant. */
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Something went wrong',
    default: 'We could not load this data. Please try again.',
  },
}

/** Danger variant. */
export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Something went wrong',
    default: 'We could not load this data. Please try again.',
  },
}

/** None variant. */
export const None: Story = {
  args: {
    variant: 'none',
  },
}

/** Notice variant. */
export const Notice: Story = {
  args: {
    variant: 'notice',
  },
}

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

/** No title, with custom icon. */
export const NoTitle: Story = {
  args: {
    title: undefined,
    icon: 'i-lucide:lightbulb',
    default: loremIpsum,
  },
}

/** No icon, with title. */
export const NoIcon: Story = {
  args: {
    icon: false,
    default: loremIpsum,
  },
}

/** No title or icon. */
export const OnlyBody: Story = {
  args: {
    title: undefined,
    icon: false,
    default: loremIpsum,
  },
}

/** Small variant. */
export const Small: Story = {
  args: {
    size: 'sm',
    title: undefined,
    default: 'A short message with no heading.',
  },
}

export const Accordion: Story = {
  args: {
    'variant': 'danger',
    'type': 'accordion',
    'title': 'Vulnerabilities found',
    'accordion-label': '2 high, 1 moderate',
    'default': loremIpsum,
  },
}

export const Replacement: Story = {
  args: {
    icon: 'i-lucide:lightbulb',
    title: 'You might not need this dependency',
    default: 'This package has been flagged as having more performant alternatives.',
    // @ts-expect-error -- code is not a prop
    code: '<Callout />',
  },
  render: args => ({
    components: { Callout },
    setup: () => ({ args }),
    template: `
      <Callout :variant="args.variant" :type="args.type" :icon="args.icon" :size="args.size">
        <template v-if="args.title" #title>{{ args.title }}</template>
        <template v-if="args['accordion-label']" #accordion-label>{{ args['accordion-label'] }}</template>
        <p>{{ args.default }} <a href="#" class="underline hover:text-white">Learn more</a></p>
        <p>Example <code class="p-1 rounded border">code</code>:</p>
        <pre class="p-2 rounded border text-sm"><code>{{ args.code }}</code></pre>
      </Callout>
    `,
  }),
}
