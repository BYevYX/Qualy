import type { Meta, StoryObj } from '@storybook/react';

import { Loading } from './Loading';

const meta: Meta<typeof Loading> = {
  component: Loading,
};
export default meta;

export const LoadingStory: StoryObj<typeof Loading> = {
  name: 'Loading',
  args: {
    message:
      'gradientColors shoul be entered like this: ["red", "green", "blue"]',
  },
};
