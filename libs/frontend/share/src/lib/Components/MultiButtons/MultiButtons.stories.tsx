import type { Meta, StoryObj } from '@storybook/react';

import { MultiButtons } from './MultiButtons';

const meta: Meta<typeof MultiButtons> = {
  component: MultiButtons,
};
export default meta;

export const MultiButtonsStory: StoryObj<typeof MultiButtons> = {
  name: 'MultiButtons',
  args: {
    buttonsData: [
      {
        id: 'first',
        text: 'first Button',
        active: true,
        onClick: () => console.log('hi'),
      },
      {
        id: 'second',

        text: 'second Button',
        active: false,
        onClick: () => console.log('hi'),
      },
      {
        id: 'link',
        text: 'link',
        active: false,
        href: '/',
      },
    ],
  },
};
