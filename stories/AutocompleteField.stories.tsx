import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { http, HttpResponse } from 'msw';

import { AutocompleteField } from '@concepta/react-material-ui';

const meta = {
  component: AutocompleteField,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    label: 'Autocomplete Field',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/food', ({ request }) => {
          const url = new URL(request.url);
          const sort = url.searchParams.get('sort');
          const sortField = sort?.split(',')[0];
          const sortOrder = sort?.split(',')[1];
          const filters = url.searchParams.get('filters[]');
          const type = filters?.split('||$eq||')[1];

          const foodArray = [
            { id: 1, name: 'Carrot', type: 'fruit' },
            { id: 2, name: 'Cesar Salad', type: 'healthy' },
            { id: 3, name: 'Apple', type: 'fruit' },
            { id: 4, name: 'Pizza', type: 'junk' },
            { id: 5, name: 'Banana', type: 'fruit' },
            { id: 6, name: 'Hamburguer', type: 'junk' },
            { id: 7, name: 'Sardines', type: 'healthy' },
          ];

          return HttpResponse.json(
            foodArray
              .sort((a, b) => {
                if (!sortField || !a[sortField] || !b[sortField]) return 0;

                if (sortField === 'id') {
                  return sortOrder === 'ASC' ? a.id - b.id : b.id - a.id;
                }

                if (sortOrder === 'ASC') {
                  return a[sortField]?.localeCompare(b[sortField]);
                }

                if (sortOrder === 'DESC') {
                  return b[sortField]?.localeCompare(a[sortField]);
                }

                return 0;
              })
              .filter((food) => {
                return type ? food.type === type : true;
              }),
          );
        }),
      ],
    },
  },
} satisfies Meta<typeof AutocompleteField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
    label: 'Autocomplete Field',
    isLoading: false,
    onChange: fn(),
  },
};

export const WithOptions: Story = {
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

/**
 * If you provide a "resource" prop, the component will fetch the data from the provided path.
 *
 * The "resourceLabel" and "resourceValue" props are used to define the label and value of the options.
 */
export const ResourceData: Story = {
  args: {
    label: 'Food',
    resource: 'food',
    resourceLabel: 'name',
    resourceValue: 'id',
  },
};

/**
 * You can also provide filters and sort options to the resource.
 */
export const ResourceDataWithFilters: Story = {
  args: {
    label: 'Junk food',
    resource: 'food',
    resourceLabel: 'name',
    resourceValue: 'id',
    filters: { 'type||$eq||': 'junk' },
  },
};

export const ResourceDataWithSort: Story = {
  args: {
    label: 'Sorted by name',
    resource: 'food',
    resourceLabel: 'name',
    resourceValue: 'id',
    sort: 'name,ASC',
  },
};
