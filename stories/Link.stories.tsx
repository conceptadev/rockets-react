import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '@concepta/react-material-ui';

const meta: Meta<typeof Link> = {
  component: Link,
  tags: ['autodocs'],
  args: {
    children: 'This is a Link',
    href: '#',
  },
  argTypes: {
    color: { control: 'color' },
    sx: { control: 'object' },
    component: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomColorLink: Story = {
  args: {
    color: 'secondary.main',
  },
};

export const CustomStyles: Story = {
  args: {
    sx: {
      fontSize: '20px',
      padding: '10px',
      backgroundColor: 'lightgray',
      borderRadius: '4px',
    },
  },
};

export const LinkWithUnderline: Story = {
  args: {
    sx: {
      textDecoration: 'underline',
    },
  },
};

export const VariantH2: Story = {
  args: {
    variant: 'h2',
  },
};

export const LinkAsButton: Story = {
  args: {
    component: 'button',
    sx: {
      padding: '10px 20px',
      backgroundColor: 'primary.main',
      color: 'white',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
    },
  },
};
