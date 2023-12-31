/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TablePagination } from '../src/components/Table/TablePagination';
import { Table as RocketsTable } from '../src/';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('Table component', () => {
  const props = {
    rows: [
      { id: '1', name: 'John', age: 35 },
      { id: '2', name: 'Jane', age: 42 },
      { id: '3', name: 'Joe', age: 67 },
      { id: '4', name: 'Johnny', age: 35 },
      { id: '5', name: 'Janis', age: 39 },
      { id: '6', name: 'Jorge', age: 60 },
      { id: '7', name: 'Jack', age: 28 },
      { id: '8', name: 'Jill', age: 32 },
      { id: '9', name: 'Jenny', age: 45 },
      { id: '10', name: 'Jared', age: 55 },
      { id: '11', name: 'Jesse', age: 25 },
      { id: '12', name: 'Jasmine', age: 29 },
    ],
    headers: [
      { id: 'id', label: 'ID' },
      { id: 'name', label: 'Name' },
      { id: 'age', label: 'Age' },
    ],
  };

  it('should render correctly', () => {
    const { getByTestId } = render(
      <RocketsTable.Root {...props}>
        <TablePagination variant="outlined" />
      </RocketsTable.Root>,
    );
    const tablePagination = getByTestId('table-pagination');
    expect(tablePagination).toBeInTheDocument();
  });

  it('should render the correct variant', () => {
    const { getByTestId } = render(
      <RocketsTable.Root {...props}>
        <TablePagination variant="outlined" />
      </RocketsTable.Root>,
    );
    const tablePagination = getByTestId('table-pagination');

    // only the outlined variant has this background color and a border
    expect(tablePagination).toHaveStyle({
      backgroundColor: 'rgb(245, 245, 245)',
      border: 'solid 1px #e5e7eb',
    });
  });

  it('should render the correct page number', () => {
    const { getByTestId } = render(
      <RocketsTable.Root {...props}>
        <TablePagination variant="outlined" />
      </RocketsTable.Root>,
    );
    const tablePagination = getByTestId('table-pagination');
    const paginationText = tablePagination.textContent;

    expect(paginationText).toContain('1–5');
  });

  it('should render the correct number of rows per page', () => {
    const { getByTestId } = render(
      <RocketsTable.Root {...props}>
        <TablePagination variant="outlined" />
      </RocketsTable.Root>,
    );
    const tablePagination = getByTestId('table-pagination');
    const paginationText = tablePagination.textContent;
    expect(paginationText).toContain('Rows per page:5');
  });

  it('should render the correct total count', () => {
    const { getByTestId } = render(
      <RocketsTable.Root {...props}>
        <TablePagination variant="outlined" />
      </RocketsTable.Root>,
    );
    const tablePagination = getByTestId('table-pagination');
    const paginationText = tablePagination.textContent;
    expect(paginationText).toContain('of 12');
  });

  it('should render the correct rowsPerPageOptions', async () => {
    const { getByRole, getAllByRole } = render(
      <RocketsTable.Root {...props}>
        <TablePagination variant="outlined" rowsPerPageOptions={[8, 20, 50]} />
      </RocketsTable.Root>,
    );
    const paginationSelect = getByRole('combobox');
    paginationSelect && fireEvent.mouseDown(paginationSelect);

    const options = getAllByRole('option');

    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('8');
    expect(options[1]).toHaveTextContent('20');
    expect(options[2]).toHaveTextContent('50');
  });

  it('should render the default rowsPerPageOptions if not provided', async () => {
    const { getByRole, getAllByRole } = render(
      <RocketsTable.Root {...props}>
        <TablePagination variant="outlined" />
      </RocketsTable.Root>,
    );
    const paginationSelect = getByRole('combobox');
    paginationSelect && fireEvent.mouseDown(paginationSelect);

    const options = getAllByRole('option');

    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('5');
    expect(options[1]).toHaveTextContent('10');
    expect(options[2]).toHaveTextContent('25');
  });
});
