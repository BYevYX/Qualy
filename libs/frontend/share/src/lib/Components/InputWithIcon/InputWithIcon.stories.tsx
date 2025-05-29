import type { Meta, StoryObj } from '@storybook/react';
import { FaHatWizard } from 'react-icons/fa6';

import { InputWithIcon } from './InputWithIcon';

const meta: Meta<typeof InputWithIcon> = {
  component: InputWithIcon,
  argTypes: {
    error: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'url', 'tel', 'search'],
    },
  },
};
export default meta;

export const InputWithIconStory: StoryObj<typeof InputWithIcon> = {
  name: 'InputWithIcon',
  args: {
    placeholder: 'InputWithIcon',
    children: <FaHatWizard color="blue" />,
  },
};
