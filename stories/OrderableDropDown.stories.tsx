import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

import { OrderableDropDown, ListItem } from '@concepta/react-material-ui';

const list: ListItem[] = [
  { id: 'item0', label: 'Item 0' },
  { id: 'item1', label: 'Item 1' },
  { id: 'item2', label: 'Item 2' },
  { id: 'item3', label: 'Item 3' },
  { id: 'item4', label: 'Item 4' },
];

/**
 * OrderableDropDown component for displaying a sortable dropdown list. The list items can be reordered by dragging and dropping. The list items can be hidden by unchecking the checkbox.
 */

const meta = {
  component: OrderableDropDown,
  tags: ['autodocs'],
  args: {
    list,
    setList: () => {},
  },
  argTypes: {},
  render: (args) => {
    const [list, setList] = useState(args.list);
    return <OrderableDropDown {...args} list={list} setList={setList} />;
  },
} satisfies Meta<typeof OrderableDropDown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Dropdown',
  },
};

export const CustomIcon: Story = {
  args: {
    icon: <ArrowDropDown />,
  },
};

export const CustomText: Story = {
  args: {
    text: 'Options',
  },
};

export const AllOption: Story = {
  args: {
    hasAllOption: true,
  },
};

/**
 * Minimum number of items to display. If the dropdown visible items count is less then or equal the minimumItems, the items are disabled.
 */
export const MinimumItems: Story = {
  args: {
    minimumItems: 2,
  },
};

export const HiddenItems: Story = {
  args: {
    list: [
      { id: 'item0', label: 'Item 0', hide: true },
      { id: 'item1', label: 'Item 1', hide: true },
      { id: 'item2', label: 'Item 2' },
      { id: 'item3', label: 'Item 3' },
    ],
  },
};

/**
 * The resetFilters callback is called when a list item is hidden. This way, the hidden filter is not applied to the filter query.
 */
export const ResetFilters: Story = {
  args: {
    list: [
      { id: 'item0', label: 'Item 0', resetFilters: fn() },
      { id: 'item1', label: 'Item 1', resetFilters: fn() },
      { id: 'item2', label: 'Item 2', resetFilters: fn() },
      { id: 'item3', label: 'Item 3', resetFilters: fn() },
    ],
  },
};
