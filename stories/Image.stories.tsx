import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Box from '@mui/material/Box';
import { Image } from '@concepta/react-material-ui';
import rockets from './assets/rockets.svg';

const meta = {
  component: Image,
  tags: ['autodocs'],
  args: {
    src: 'https://picsum.photos/400/200',
  },
  argTypes: {},
  parameters: {
    layout: 'centered', // or `padded` by default
  },
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imgFluid: true,
    alt: 'Example image',
  },
};

export const Alt: Story = {
  args: {
    alt: 'This is the alt text',
  },
};

export const FallbackImage: Story = {
  args: {
    src: 'https://example.com/nonexistent.jpg',
    defaultImage: rockets,
  },
};

export const FluidImage: Story = {
  args: {
    src: 'https://picsum.photos/300/150',
    imgFluid: true,
  },
  render: (args) => (
    <Box sx={{ background: '#ffcccc', width: 400, height: 300 }}>
      <Image {...args} />
    </Box>
  ),
};

export const ErrorHandler: Story = {
  tags: ['!autodocs'],
  args: {
    src: 'https://example.com/nonexistent.jpg',
    onError: () => {
      fn();
      window.alert('Image failed');
    },
  },
};

export const LoadHandler: Story = {
  tags: ['!autodocs'],
  args: {
    onLoad: () => {
      fn();
      window.alert('Image loaded');
    },
  },
};

export const CustomStyles: Story = {
  args: {
    imgFluid: true,
    sx: {
      borderRadius: '20px',
      // styles for example
      border: '4px dashed #0000ff',
    },
  },
};

export const BoxProps: Story = {
  args: {
    src: rockets,
    bgcolor: 'primary.main',
    boxShadow: 3,
    m: 4,
    onClick: fn(),
  },
};
