/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Table as RocketsTable } from '../src/';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import { RowProps, Order } from '../src/components/Table/types';
import { TableBodyRows } from '../src/components/Table/TableBody/TableBodyRows';

type GenerateRowsProps = (length: number) => RowProps[];

const generateRows: GenerateRowsProps = (length: number) => {
  const rows: RowProps[] = [];
  for (let i = 0; i < length; i++) {
    rows.push({ id: String(i), name: `row ${i}`, age: i });
  }
  return rows;
};

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('TableBodyRows component', () => {
  const props = {
    rows: generateRows(3),
    headers: [
      { id: 'id', label: 'ID' },
      { id: 'name', label: 'Name' },
      { id: 'age', label: 'Age' },
    ],
  };

  it('should render correctly', () => {
    render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table variant="clean">
            <TableBody>
              <TableBodyRows />
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );
  });

  it('renders loading skeleton when isLoading is true', () => {
    const { container } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table variant="clean">
            <TableBody>
              <TableBodyRows isLoading />
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const skeleton = container.querySelectorAll('.MuiSkeleton-root');
    expect(skeleton.length).toBe(15);
  });

  it('renders rows when isLoading is false and isControlled is true', () => {
    const tableQueryState = {
      order: Order.Asc,
      orderBy: 'name',
      rowsPerPage: 10,
      page: 1,
    };

    const setTableQueryState = jest.fn();

    const { getByText } = render(
      <RocketsTable.Root
        {...props}
        tableQueryState={tableQueryState}
        pageCount={1}
        total={3}
        updateTableQueryState={setTableQueryState}
      >
        <TableContainer>
          <RocketsTable.Table variant="clean">
            <TableBody>
              <TableBodyRows isLoading={false} />
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const row0 = getByText('row 0');
    const row1 = getByText('row 1');
    const row2 = getByText('row 2');

    expect(row0).toBeInTheDocument();
    expect(row1).toBeInTheDocument();
    expect(row2).toBeInTheDocument();
  });

  it('renders paginated rows automatically when isLoading is false and isControlled is false', () => {
    const { getByText } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table variant="clean">
            <TableBody>
              <TableBodyRows />
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const row0 = getByText('row 0');
    const row1 = getByText('row 1');
    const row2 = getByText('row 2');

    expect(row0).toBeInTheDocument();
    expect(row1).toBeInTheDocument();
    expect(row2).toBeInTheDocument();
  });

  it('renders custom row correctly if renderRow is assigned', () => {
    const renderRow = (row: RowProps) => {
      return (
        <RocketsTable.BodyRow row={row}>
          <TableCell>{`custom cell (id): ${row.id}`}</TableCell>
          <TableCell>{`custom cell (name): ${row.name}`}</TableCell>
          <TableCell>{`custom cell (age): ${row.age}`}</TableCell>
        </RocketsTable.BodyRow>
      );
    };

    const { queryAllByText } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table variant="clean">
            <TableBody>
              <TableBodyRows renderRow={renderRow} />
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const customIdCells = queryAllByText('custom cell (id)', { exact: false });
    const customNameCells = queryAllByText('custom cell (name)', {
      exact: false,
    });
    const customAgeCells = queryAllByText('custom cell (age)', {
      exact: false,
    });

    expect(customIdCells.length).toBe(3);
    expect(customNameCells.length).toBe(3);
    expect(customAgeCells.length).toBe(3);
  });
});
