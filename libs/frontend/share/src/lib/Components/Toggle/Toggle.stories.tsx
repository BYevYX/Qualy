import type { Meta, StoryObj } from '@storybook/react';

import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const ToggleStory: StoryObj<typeof Toggle> = {
  name: 'Toggle',
  args: {
    firstButonText: 'first button',
    secondButonText: 'second button',
  },
};
