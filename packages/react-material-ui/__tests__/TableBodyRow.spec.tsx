/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Table as RocketsTable } from '../src/';
import { TableBody, TableContainer } from '@mui/material';
import { RowProps } from '../src/components/Table/types';

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

describe('TableBodyRow component', () => {
  const props = {
    rows: generateRows(3),
    headers: [
      { id: 'id', label: 'ID' },
      { id: 'name', label: 'Name' },
      { id: 'age', label: 'Age' },
    ],
  };

  it('should render correctly without checkboxes', () => {
    const { queryAllByRole, getByText } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table variant="clean">
            <TableBody>
              {props.rows?.map((row) => (
                <RocketsTable.BodyRow row={row} key={row.id}>
                  <RocketsTable.BodyCell row={row} />
                </RocketsTable.BodyRow>
              ))}
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const checkboxes = queryAllByRole('checkbox');
    expect(checkboxes.length).toBe(0);

    const row0 = getByText('row 0');
    const row1 = getByText('row 1');
    const row2 = getByText('row 2');

    expect(row0).toBeInTheDocument();
    expect(row1).toBeInTheDocument();
    expect(row2).toBeInTheDocument();
  });

  it('should render correctly with checkboxes', () => {
    const { queryAllByRole } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table variant="clean">
            <TableBody>
              {props.rows?.map((row) => (
                <RocketsTable.BodyRow row={row} key={row.id} hasCheckboxes>
                  <RocketsTable.BodyCell row={row} />
                </RocketsTable.BodyRow>
              ))}
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const checkboxes = queryAllByRole('checkbox');

    expect(checkboxes.length).toBe(3);
  });

  it('should select the table row when clicked with checkboxes', () => {
    const { queryAllByRole } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table variant="clean">
            <TableBody>
              {props.rows?.map((row) => (
                <RocketsTable.BodyRow row={row} key={row.id} hasCheckboxes>
                  <RocketsTable.BodyCell row={row} />
                </RocketsTable.BodyRow>
              ))}
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const rows = queryAllByRole('checkbox');
    const firstRow = rows[0];

    expect(firstRow).not.toBeChecked();

    fireEvent.click(firstRow);

    expect(firstRow).toBeChecked();
  });

  it('should not select the row when clicked without checkboxes', () => {
    const { container } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table variant="clean">
            <TableBody>
              {props.rows?.map((row) => (
                <RocketsTable.BodyRow row={row} key={row.id}>
                  <RocketsTable.BodyCell row={row} />
                </RocketsTable.BodyRow>
              ))}
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const firstRow = container.querySelector('tr');

    expect(firstRow).toBeInTheDocument();
    expect(firstRow).not.toBeChecked();

    firstRow && fireEvent.click(firstRow);

    expect(firstRow).not.toBeChecked();
  });
});
