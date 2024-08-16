/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FilterType } from '../src/components/Filter/Filter';
import { HeaderProps } from '../src/components/Table/types';
import ComposedTable from '../src/components/ComposedTable';

const headers: HeaderProps[] = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'role',
    label: 'Role',
    width: 200,
  },
  {
    id: 'active',
    label: 'Active',
  },
];

const data = [
  {
    id: 'johndoe',
    name: 'John Doe',
    role: 'Manager',
    active: true,
  },
  {
    id: 'janedoe',
    name: 'Jane Doe',
    role: 'Admin',
    active: true,
  },
  {
    id: 'jamesdoe',
    name: 'James Doe',
    role: 'Manager',
    active: false,
  },
];

describe('ComposedTable Component', () => {
  const allFilters: FilterType[] = [
    {
      id: 'text',
      label: 'Text',
      type: 'text',
      placeholder: 'Text Test Placeholder',
      onChange: jest.fn(),
    },
    {
      id: 'autocomplete',
      type: 'autocomplete',
      options: [
        {
          label: 'Autocomplete Test',
          value: 'autocompleteTest',
        },
      ],
      label: 'Autocomplete Test Label',
      value: undefined,
      onChange: jest.fn(),
      isLoading: false,
    },
    {
      id: 'select',
      type: 'select',
      options: [
        {
          label: 'Test',
          value: 'test',
        },
      ],
      label: 'Select Test Label',
      onChange: jest.fn(),
    },
  ];

  it('renders filter inputs when filter prop is passed', () => {
    const { getByPlaceholderText, getAllByRole, getByRole } = render(
      <ComposedTable
        rows={data.map((row) => ({
          ...row,
          active: row.active ? 'Active' : 'Inactive',
        }))}
        headers={headers}
        tableQueryState={{}}
        updateTableQueryState={() => null}
        total={data.length}
        pageCount={1}
        data={data}
        isPending={false}
        filters={allFilters}
        complementaryActions={<button>Action Button</button>}
      />,
    );

    const input = getByPlaceholderText('Text Test Placeholder');
    expect(input).toBeInTheDocument();

    const comboboxInputs = getAllByRole('combobox');
    expect(comboboxInputs).toHaveLength(3);

    const tableElement = getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  it('renders only default table when filters prop is empty', () => {
    const { queryByPlaceholderText, getByRole, getAllByRole } = render(
      <ComposedTable
        rows={data.map((row) => ({
          ...row,
          active: row.active ? 'Active' : 'Inactive',
        }))}
        headers={headers}
        tableQueryState={{}}
        updateTableQueryState={() => null}
        total={data.length}
        pageCount={1}
        data={data}
        isPending={false}
      />,
    );

    const textInput = queryByPlaceholderText('Text Test Placeholder');
    expect(textInput).toBeNull();

    const comboboxInputs = getAllByRole('combobox');
    expect(comboboxInputs).toHaveLength(1);

    const tableElement = getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });
});
