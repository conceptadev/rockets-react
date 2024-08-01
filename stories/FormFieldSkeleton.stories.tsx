import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormFieldSkeleton, TextField } from '@concepta/react-material-ui';

const meta = {
  component: FormFieldSkeleton,
  tags: ['autodocs'],
  args: {
    isLoading: true,
    hideLabel: false,
  },
  argTypes: {
    isLoading: { control: 'boolean' },
    hideLabel: { control: 'boolean' },
  },
  render: (args) => (
    <FormFieldSkeleton {...args}>
      <TextField label="Text field" />
    </FormFieldSkeleton>
  ),
} satisfies Meta<typeof FormFieldSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithoutLabel: Story = {
  args: {
    hideLabel: true,
  },
};

export const NotLoading: Story = {
  args: {
    isLoading: false,
  },
};
