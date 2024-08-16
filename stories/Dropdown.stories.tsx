import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Dropdown, DropdownItem } from '@concepta/react-material-ui';
import ArrowRight from '@mui/icons-material/ArrowRight';

const options: DropdownItem[] = [
  {
    key: 'item1',
    onClick: fn(),
    text: 'Item 1',
  },
  {
    key: 'item2',
    onClick: fn(),
    text: 'Item 2',
  },
];

const meta = {
  component: Dropdown,
  tags: ['autodocs'],
  args: {
    options,
  },
  argTypes: {},
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const VerticalToggle: Story = {
  args: {
    toggleDirection: 'vertical',
  },
};

export const CustomTextProps: Story = {
  args: {
    textProps: {
      fontSize: 20,
      fontWeight: 500,
      color: 'primary.main',
    },
  },
};

const optionsWithIcon: DropdownItem[] = [
  {
    key: 'item1',
    text: 'Item 1',
    icon: <ArrowRight />,
  },
  {
    key: 'item2',
    text: 'Item 2',
    icon: <ArrowRight />,
  },
];

export const ItemsWithIcon: Story = {
  args: {
    options: optionsWithIcon,
  },
};

const optionsWithIconRight: DropdownItem[] = [
  {
    key: 'item1',
    text: 'Item 1',
    icon: <ArrowRight />,
    iconPosition: 'right',
  },
  {
    key: 'item2',
    text: 'Item 2',
    icon: <ArrowRight />,
    iconPosition: 'right',
  },
];
export const ItemsWithIconToTheRight: Story = {
  args: {
    options: optionsWithIconRight,
  },
};
