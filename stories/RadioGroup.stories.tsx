import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '@concepta/react-material-ui';

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
  },
  argTypes: {},
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: 'Choose an option',
  },
};

export const Required: Story = {
  args: {
    label: 'Choose an option',
    required: true,
  },
};

export const DisabledGroup: Story = {
  args: {
    label: 'Choose an option',
    disabled: true,
  },
};

export const DisabledOption: Story = {
  args: {
    label: 'Choose an option',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2', disabled: true },
      { label: 'Option 3', value: '3', disabled: true },
    ],
  },
};

export const HorizontalRadio: Story = {
  args: {
    label: 'Choose an option',
    row: true,
  },
};

export const CustomLabelStyles: Story = {
  args: {
    label: 'Choose an option',
    labelProps: {
      style: {
        color: 'red',
        fontSize: '20px',
      },
    },
  },
};

export const CustomStyles: Story = {
  args: {
    label: 'Choose an option',
    containerProps: {
      style: {
        backgroundColor: 'lightgray',
        padding: '10px',
      },
    },
  },
};

export const PreSelectedValue: Story = {
  args: {
    label: 'Choose an option',
    value: '2',
  },
};
