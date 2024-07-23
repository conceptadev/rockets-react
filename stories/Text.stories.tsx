import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '@concepta/react-material-ui';

const meta = {
  component: Text,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'body1',
        'body2',
        'caption',
        'button',
        'overline',
        'subtitle1',
        'subtitle2',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
      ],
    },
    fontWeight: {
      control: 'select',
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
    align: {
      control: 'select',
      options: ['inherit', 'left', 'center', 'right', 'justify'],
    },
    sx: {
      control: 'object',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Text',
    fontWeight: '300',
    align: 'left',
    sx: {},
    variant: 'body1',
  },
};

export const CustomFontWeight: Story = {
  args: {
    children: 'Custom Font Weight',
    fontWeight: '700',
  },
};

export const CustomFontSize: Story = {
  args: {
    children: 'Custom Font Size',
    fontSize: '2rem',
  },
};

export const CustomColor: Story = {
  args: {
    children: 'Custom Color',
    color: 'red',
  },
};

export const DifferentVariants: Story = {
  args: {
    children: 'Heading 1 Text',
    variant: 'h1',
  },
};

export const TextAlignment: Story = {
  args: {
    children: 'Center Aligned Text',
    align: 'center',
  },
};

export const TextWithCustomStyles: Story = {
  args: {
    children: 'Text with Custom Styles',
    sx: { color: 'purple', textTransform: 'uppercase', letterSpacing: '2px' },
  },
};
