import type { Meta, StoryObj } from '@storybook/react';

import { SuperLink } from './SuperLink';

const meta: Meta<typeof SuperLink> = {
  component: SuperLink,
};
export default meta;

export const SuperLinkStory: StoryObj<typeof SuperLink> = {
  name: 'SuperLink',
  args: {
    children: 'link',
    variant: 'button',
    href: '/',
  },
};
