import type { Meta, StoryObj } from '@storybook/react';

import { E404 } from './404';

const meta: Meta<typeof E404> = {
  component: E404,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

type Story = StoryObj<typeof E404>;

export const E404Story: Story = {
  name: '404',
  args: {
    size: 'md',
  },
};
