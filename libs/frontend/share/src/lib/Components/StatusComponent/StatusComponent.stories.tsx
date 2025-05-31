import type { Meta, StoryObj } from '@storybook/react';

import { StatusComponent } from './StatusComponent';

const meta: Meta<typeof StatusComponent> = {
  component: StatusComponent,
};
export default meta;

export const StatusComponentStory: StoryObj<typeof StatusComponent> = {
  name: 'StatusComponent',
  args: {
    display: true,
    children: 'Some status',
    type: 'success',
  },
};
