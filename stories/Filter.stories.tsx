import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Filter } from '../packages/react-material-ui/src/components/Filter';

const meta = {
  component: Filter,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} satisfies Meta<typeof Filter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    settingsId: 'filter-default',
    filters: [
      {
        id: 'text-filter',
        type: 'text',
        label: 'Text Filter',
        onChange: () => {},
        columns: 4,
      },
      {
        id: 'autocomplete-filter',
        type: 'autocomplete',
        label: 'Autocomplete Filter',
        value: '',
        onChange: () => {},
        columns: 4,
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ],
        isLoading: false,
        hide: false,
      },
      {
        id: 'select-filter',
        type: 'select',
        label: 'Select Filter',
        value: '',
        onChange: () => {},
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ],
        columns: 4,
      },
    ],
  },
};

/**
 * AdditionalGridItems adds components to the end of the filters list, before the filter icon.
 */

export const AdditionalGridItems: Story = {
  args: {
    settingsId: 'filter-additionalGridItems',
    filters: [
      {
        id: 'text-filter',
        type: 'text',
        label: 'Text Filter',
        onChange: () => {},
        columns: 4,
      },
    ],
    additionalGridItems: [
      {
        component: (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#ccffff',
              height: '100%',
              borderRadius: '8px',
            }}
          >
            Additional Grid Item
          </Box>
        ),
        columns: 4,
      },
    ],
  },
};

/**
 * ComplementaryActions adds the a ReactNode after the filter icon.
 */
export const ComplementaryActions: Story = {
  args: {
    settingsId: 'filter-complementaryActions',
    filters: [
      {
        id: 'text-filter',
        type: 'text',
        label: 'Text Filter',
        onChange: () => {},
        columns: 4,
      },
    ],
    complementaryActions: <Button variant="contained">Action</Button>,
  },
};
