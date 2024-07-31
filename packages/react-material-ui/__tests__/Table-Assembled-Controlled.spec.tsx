/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Table as RocketsTable } from '../src';
import { TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { RowProps } from '../src/components/Table/types';

jest.mock('next/navigation', () => ({
  useRouter: () => {
    return {
      replace: jest.fn(),
    };
  },
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

type GenerateRowsProps = (length: number) => RowProps[];

const generateRows: GenerateRowsProps = (length: number) => {
  const rows: RowProps[] = [];
  for (let i = 0; i < length; i++) {
    rows.push({ id: `id ${i}`, name: `user ${i}`, age: `${i} years old` });
  }
  return rows;
};

describe('Assembled Table - Controlled', () => {
  const props = {
    rows: generateRows(7),
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
          <RocketsTable.Table>
            <TableHead>
              <TableRow>
                <RocketsTable.HeaderCells />
              </TableRow>
            </TableHead>
            <TableBody>
              <RocketsTable.BodyRows />
            </TableBody>
          </RocketsTable.Table>
          <RocketsTable.Pagination variant="clean" />
        </TableContainer>
      </RocketsTable.Root>,
    );
  });

  it('should render correct headers', () => {
    const { container } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table>
            <TableHead>
              <TableRow>
                <RocketsTable.HeaderCells />
              </TableRow>
            </TableHead>
            <TableBody>
              <RocketsTable.BodyRows />
            </TableBody>
          </RocketsTable.Table>
          <RocketsTable.Pagination variant="clean" />
        </TableContainer>
      </RocketsTable.Root>,
    );

    const tableHeaders = container.querySelectorAll('th');
    expect(tableHeaders).toHaveLength(3);
    expect(tableHeaders[0]).toHaveTextContent('ID');
    expect(tableHeaders[1]).toHaveTextContent('Name');
    expect(tableHeaders[2]).toHaveTextContent('Age');
  });

  it('should render correct number of rows and correct data', () => {
    const { container } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table>
            <TableHead>
              <TableRow>
                <RocketsTable.HeaderCells />
              </TableRow>
            </TableHead>
            <TableBody>
              <RocketsTable.BodyRows />
            </TableBody>
          </RocketsTable.Table>
          <RocketsTable.Pagination variant="clean" />
        </TableContainer>
      </RocketsTable.Root>,
    );
    const tableRows = container.querySelectorAll('tr');
    expect(tableRows).toHaveLength(6); // 1 header + 5 body rows

    const tableCells = container.querySelectorAll('td');

    for (let i = 0; i < tableCells.length; i++) {
      const row = Math.floor(i / 3);
      const header = i % 3;
      expect(tableCells[i].textContent).toBe(
        props.rows[row][props.headers[header].id],
      );
    }
  });

  it('should select a row / check if row is selected', () => {
    const { container } = render(
      <RocketsTable.Root
        {...props}
        headers={[{ id: 'checkbox', label: '' }, ...props.headers]}
      >
        <TableContainer>
          <RocketsTable.Table>
            <TableHead>
              <TableRow>
                <RocketsTable.HeaderCells />
              </TableRow>
            </TableHead>
            <TableBody>
              <RocketsTable.BodyRows
                renderRow={(row, labelId) => (
                  <RocketsTable.BodyRow row={row} key={row.id}>
                    <RocketsTable.BodyCheckboxes row={row} labelId={labelId} />
                    <RocketsTable.BodyCell row={row} />
                  </RocketsTable.BodyRow>
                )}
              />
            </TableBody>
          </RocketsTable.Table>
          <RocketsTable.Pagination variant="clean" />
        </TableContainer>
      </RocketsTable.Root>,
    );

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(5);

    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[2]);

    const selectedCheckboxes = container.querySelectorAll(
      'input[type="checkbox"]:checked',
    );

    expect(selectedCheckboxes).toHaveLength(2);
  });

  it('should handle select all rows / check if rows are selected', () => {
    const { container } = render(
      <RocketsTable.Root
        {...props}
        headers={[{ id: 'checkbox', label: '' }, ...props.headers]}
      >
        <TableContainer>
          <RocketsTable.Table>
            <TableHead>
              <TableRow>
                <RocketsTable.HeaderCheckbox />
                <RocketsTable.HeaderCells />
              </TableRow>
            </TableHead>
            <TableBody>
              <RocketsTable.BodyRows
                renderRow={(row, labelId) => (
                  <RocketsTable.BodyRow row={row} key={row.id}>
                    <RocketsTable.BodyCheckboxes row={row} labelId={labelId} />
                    <RocketsTable.BodyCell row={row} />
                  </RocketsTable.BodyRow>
                )}
              />
            </TableBody>
          </RocketsTable.Table>
          <RocketsTable.Pagination variant="clean" />
        </TableContainer>
      </RocketsTable.Root>,
    );

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(6);

    fireEvent.click(checkboxes[0]);

    const selectedCheckboxes = container.querySelectorAll(
      'input[type="checkbox"]:checked',
    );

    expect(selectedCheckboxes).toHaveLength(6);
  });

  it('should handle change of page', () => {
    const { container } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table>
            <TableHead>
              <TableRow>
                <RocketsTable.HeaderCells />
              </TableRow>
            </TableHead>
            <TableBody>
              <RocketsTable.BodyRows />
            </TableBody>
          </RocketsTable.Table>
          <RocketsTable.Pagination variant="clean" />
        </TableContainer>
      </RocketsTable.Root>,
    );

    const nextPageButton = container.querySelector(
      'button[aria-label="Go to next page"]',
    );

    expect(nextPageButton).toBeInTheDocument();
    const paginationInfo = container.querySelector(
      '.MuiTablePagination-displayedRows',
    );
    expect(paginationInfo).toHaveTextContent('1-5 of 7');

    nextPageButton && fireEvent.click(nextPageButton);

    expect(paginationInfo).toHaveTextContent('6-7 of 7');
  });

  it('should handle change of rows per page', () => {
    const { container, getAllByRole, getByRole } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table>
            <TableHead>
              <TableRow>
                <RocketsTable.HeaderCells />
              </TableRow>
            </TableHead>
            <TableBody>
              <RocketsTable.BodyRows />
            </TableBody>
          </RocketsTable.Table>
          <RocketsTable.Pagination variant="clean" />
        </TableContainer>
      </RocketsTable.Root>,
    );

    const paginationSelect = getByRole('combobox');
    paginationSelect && fireEvent.mouseDown(paginationSelect);

    const options = getAllByRole('option');

    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('5');
    expect(options[1]).toHaveTextContent('10');
    expect(options[2]).toHaveTextContent('25');

    fireEvent.click(options[1]);

    const tableRows = container.querySelectorAll('tr');
    expect(tableRows).toHaveLength(8); // 1 header + 7 body rows
  });

  it('should handle sorting of table correctly', () => {
    const { getByText } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table>
            <TableHead>
              <TableRow>
                <RocketsTable.HeaderCells />
              </TableRow>
            </TableHead>
            <TableBody>
              <RocketsTable.BodyRows />
            </TableBody>
          </RocketsTable.Table>
          <RocketsTable.Pagination variant="clean" />
        </TableContainer>
      </RocketsTable.Root>,
    );

    const idHeader = getByText('ID');
    expect(idHeader).toHaveTextContent('IDsorted ascending');
    fireEvent.click(idHeader);
    expect(idHeader).toHaveTextContent('IDsorted descending');

    const nameHeader = getByText('Name');
    expect(nameHeader).toHaveTextContent('Name');
    fireEvent.click(nameHeader);
    expect(nameHeader).toHaveTextContent('Namesorted ascending');
    fireEvent.click(nameHeader);
    expect(nameHeader).toHaveTextContent('Namesorted descending');
  });
});
