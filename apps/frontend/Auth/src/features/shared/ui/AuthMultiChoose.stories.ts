import type { Meta, StoryObj } from '@storybook/react';

import AuthMultiChoose from './AuthMultiChoose';

const meta: Meta<typeof AuthMultiChoose> = {
  component: AuthMultiChoose,
};

export default meta;
type Story = StoryObj<typeof AuthMultiChoose>;

export const Primary: Story = {};
