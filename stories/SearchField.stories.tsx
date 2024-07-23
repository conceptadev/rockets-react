import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { SearchField } from '@concepta/react-material-ui';

const meta = {
  component: SearchField,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    searchIconPlacement: {
      type: 'string',
      control: {
        type: 'select',
        options: ['start', 'end'],
      },
    },
    defaultValue: {
      type: 'string',
      control: {
        type: 'text',
      },
    },
    wait: {
      type: 'number',
      control: {
        type: 'number',
      },
    },
    onDebouncedSearchChange: {
      type: 'function',
      description:
        'Callback function that is called with the debounced search value',
    },
    onClear: {
      type: 'function',
      description:
        'Callback function that is called when the clear button is clicked',
    },
  },
} satisfies Meta<typeof SearchField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchIconPlacement: 'end',
    defaultValue: '',
    wait: 500,
  },
};

export const SearchIconAtStart: Story = {
  args: {
    searchIconPlacement: 'start',
  },
};

export const InitialValue: Story = {
  args: {
    defaultValue: 'Initial search',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search something...',
  },
};

export const DebouncedSearch: Story = {
  args: {
    // onDebouncedSearchChange: (value) =>
    //   console.log(`Debounced search: ${value}`),
    onDebouncedSearchChange: fn(),
  },
};

export const CustomWaitTime: Story = {
  args: {
    wait: 1500,
    // onDebouncedSearchChange: (value) =>
    //   console.log(`Debounced search: ${value}`),
    onDebouncedSearchChange: fn(),
  },
};

/**
 * If you override the onClear function, you have to programatically clear the input field value.
 */
export const ClearButtonCallback: Story = {
  args: {
    defaultValue: 'Clear me',
    onClear: fn(),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
