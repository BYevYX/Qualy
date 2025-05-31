import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
};
export default meta;

export const TooltipStory: StoryObj<typeof Tooltip> = {
  name: 'Tooltip',
  args: {
    content: 'this is lol',
    position: 'top',
    children: <div style={{ color: 'white' }}>hover this</div>,
  },
};
