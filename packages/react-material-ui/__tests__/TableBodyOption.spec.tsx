/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TableBodyOption } from '../src/components/Table/TableBody/TableBodyOption';
import { Table as RocketsTable } from '../src/';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { RowProps } from '../src/components/Table/types';

type GenerateRowsProps = (length: number) => RowProps[];

const generateRows: GenerateRowsProps = (length: number) => {
  const rows: RowProps[] = [];
  for (let i = 0; i < length; i++) {
    rows.push({ id: String(i), name: `row ${i}`, age: i });
  }
  return rows;
};

const customRowOptions = (row: RowProps) => [
  { onClick: () => {}, key: `${row.id} key 0`, text: `row ${row.id} option 0` },
  { onClick: () => {}, key: `${row.id} key 1`, text: `row ${row.id} option 1` },
];

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('TableBodyOption component', () => {
  const props = {
    rows: generateRows(3),
    headers: [
      { id: 'id', label: 'ID' },
      { id: 'name', label: 'Name' },
      { id: 'age', label: 'Age' },
    ],
  };

  it('should render correctly', () => {
    const { getAllByTestId } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table stickyHeader variant="clean">
            <TableBody>
              {props.rows?.map((row) => (
                <RocketsTable.BodyRow row={row} key={row.id}>
                  <TableBodyOption
                    row={row}
                    customRowOptions={customRowOptions(row)}
                    toggleDirection="horizontal"
                  />
                  <RocketsTable.BodyCell row={row} />
                </RocketsTable.BodyRow>
              ))}
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );
    const menus = getAllByTestId('fade-button');
    expect(menus).toHaveLength(3);
  });

  it('should render the TableOptions component with the correct values', async () => {
    const { getAllByTestId, getByText } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table stickyHeader variant="clean">
            <TableBody>
              {props.rows?.map((row) => (
                <RocketsTable.BodyRow row={row} key={row.id}>
                  <TableBodyOption
                    row={row}
                    customRowOptions={customRowOptions(row)}
                    toggleDirection="vertical"
                  />
                  <RocketsTable.BodyCell row={row} />
                </RocketsTable.BodyRow>
              ))}
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );
    const menus = getAllByTestId('fade-button');
    expect(menus).toHaveLength(3);

    const horizontalIcon = getAllByTestId('MoreVertIcon');
    expect(horizontalIcon).toHaveLength(3);

    fireEvent.click(menus[0]);

    const item0 = getByText('row 0 option 0');
    const item1 = getByText('row 0 option 1');
    expect(item0).toBeInTheDocument();
    expect(item1).toBeInTheDocument();
  });
});
