import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  argTypes: {
    error: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'url', 'tel', 'search'],
    },
  },
};
export default meta;

export const InputStory: StoryObj<typeof Input> = {
  name: 'Input',
  args: {
    placeholder: 'input',
  },
};
