/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { TablePaginationNumbers } from '../src/components/Table/TablePaginationNumbers';
import { Table as RocketsTable } from '../src/';
import { RowProps } from '../src/components/Table/types';

type GenerateRowsProps = (length: number) => RowProps[];

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('Table component', () => {
  const generateRows: GenerateRowsProps = (length: number) => {
    const rows: RowProps[] = [];
    for (let i = 0; i < length; i++) {
      rows.push({ id: String(i), name: `row ${i}`, age: i });
    }
    return rows;
  };

  const props = {
    rows: generateRows(12),
    headers: [
      { id: 'id', label: 'ID' },
      { id: 'name', label: 'Name' },
      { id: 'age', label: 'Age' },
    ],
  };

  it('should render correctly', () => {
    const { getByTestId } = render(
      <RocketsTable.Root {...props}>
        <TablePaginationNumbers />
      </RocketsTable.Root>,
    );
    const tablePagination = getByTestId('table-pagination');
    expect(tablePagination).toBeInTheDocument();
  });

  it('should render the correct number of pages using “pageCount”', () => {
    const { getByLabelText, getAllByLabelText } = render(
      <RocketsTable.Root
        {...props}
        rows={generateRows(5)}
        total={28}
        pageCount={6}
        tableQueryState={{}}
        updateTableQueryState={() => {}}
      >
        <TablePaginationNumbers />
      </RocketsTable.Root>,
    );

    const page1 = getByLabelText('page 1');
    expect(page1).toBeInTheDocument();

    const pageButtons = getAllByLabelText('Go to page', { exact: false });
    expect(pageButtons.length).toBe(5);
  });

  it('renders correct number of pages using rows length (12)', () => {
    const { getByLabelText, getAllByLabelText } = render(
      <RocketsTable.Root {...props}>
        <TablePaginationNumbers />
      </RocketsTable.Root>,
    );

    const page1 = getByLabelText('page 1');
    expect(page1).toBeInTheDocument();

    const pageButtons = getAllByLabelText('Go to page', { exact: false });
    expect(pageButtons.length).toBe(2);
  });

  it('renders correct number of pages using rows length (28)', () => {
    const { getByLabelText, getAllByLabelText } = render(
      <RocketsTable.Root {...props} rows={generateRows(28)}>
        <TablePaginationNumbers />
      </RocketsTable.Root>,
    );

    const page1 = getByLabelText('page 1');
    expect(page1).toBeInTheDocument();

    const pageButtons = getAllByLabelText('Go to page', { exact: false });
    expect(pageButtons.length).toBe(5);
  });

  it('renders correct number of pages using rows length (42)', () => {
    const { getByLabelText, getAllByLabelText, getByText } = render(
      <RocketsTable.Root {...props} rows={generateRows(42)}>
        <TablePaginationNumbers />
      </RocketsTable.Root>,
    );

    const page1 = getByLabelText('page 1');
    expect(page1).toBeInTheDocument();

    const ellipsis = getByText('…');
    expect(ellipsis).toBeInTheDocument();

    const pageButtons = getAllByLabelText('Go to page', { exact: false });
    expect(pageButtons.length).toBe(5);
  });
});
