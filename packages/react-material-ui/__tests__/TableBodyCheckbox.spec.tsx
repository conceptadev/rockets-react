/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { TableBodyCells } from '../src/components/Table/TableBody/TableBodyCells';
import { TableBodyCheckbox } from '../src/components/Table/TableBody/TableBodyCheckbox';
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

describe('TableBodyCells component', () => {
  const props = {
    rows: generateRows(3),
    headers: [
      { id: 'id', label: 'ID' },
      { id: 'name', label: 'Name' },
      { id: 'age', label: 'Age' },
    ],
  };

  it('should render correctly', () => {
    const { queryAllByRole } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table stickyHeader variant="clean">
            <TableBody>
              {props.rows?.map((row) => (
                <RocketsTable.BodyRow row={row} key={row.id}>
                  <TableBodyCheckbox row={row} labelId={row.id} />
                  <TableBodyCells row={row} />
                </RocketsTable.BodyRow>
              ))}
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const checkboxes = queryAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
  });

  it('renders the checkbox with correct aria-labelledby', () => {
    const { queryAllByRole } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table stickyHeader variant="clean">
            <TableBody>
              {props.rows?.map((row) => (
                <RocketsTable.BodyRow row={row} key={row.id}>
                  <TableBodyCheckbox row={row} labelId={row.id} />
                  <TableBodyCells row={row} />
                </RocketsTable.BodyRow>
              ))}
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const checkboxes = queryAllByRole('checkbox');
    expect(checkboxes[0]).toHaveAttribute('aria-labelledby', '0');
  });

  it('calls handleSelectCheckboxItem when checkbox is clicked', async () => {
    const { queryAllByRole, debug } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table stickyHeader variant="clean">
            <TableBody>
              {props.rows?.map((row) => (
                <RocketsTable.BodyRow row={row} key={row.id}>
                  <TableBodyCheckbox row={row} labelId={row.id} />
                  <TableBodyCells row={row} />
                </RocketsTable.BodyRow>
              ))}
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const checkboxes = queryAllByRole('checkbox');
    const checkbox = checkboxes[0];

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
  });
});
