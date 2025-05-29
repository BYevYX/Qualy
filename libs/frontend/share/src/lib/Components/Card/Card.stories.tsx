import type { Meta, StoryObj } from '@storybook/react';
import type { JSX } from 'react';

import { Card, CardContent, CardFooter, CardHeader } from './Card';

type CardAndTexts = React.ComponentProps<typeof Card> & {
  headerText: string;
  contentText: string;
  footerText: string;
  children: string[];
};

const meta: Meta<CardAndTexts> = {
  component: Card,
  argTypes: {
    children: {
      control: { type: 'multi-select' },
      options: ['CardHeader', 'CardContent', 'CardFooter'],
    },
    headerText: { control: 'text' },
    contentText: { control: 'text' },
    footerText: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<CardAndTexts>;

export const FullCard: Story = {
  args: {
    children: ['CardHeader', 'CardContent', 'CardFooter'],
    headerText: 'Header',
    contentText: 'Content',
    footerText: 'Footer',
  },
  render: ({ children, headerText, contentText, footerText }) => {
    const componentMap: Record<string, JSX.Element> = {
      CardHeader: <CardHeader key="CardHeader">{headerText}</CardHeader>,
      CardContent: <CardContent key="CardContent">{contentText}</CardContent>,
      CardFooter: <CardFooter key="CardFooter">{footerText}</CardFooter>,
    };

    return (
      <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
        }}
      >
        <Card>{children.map((key) => componentMap[key])}</Card>
      </div>
    );
  },
};
