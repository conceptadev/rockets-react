/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Table as RocketsTable } from '../src/';
import { TableBody, TableContainer } from '@mui/material';

describe('TableBodyCells component', () => {
  const props = {
    rows: [
      { id: '1', name: undefined, age: 35 },
      {
        id: '2',
        name: {
          component: <div>Jane Custom Component</div>,
          value: 'Jane',
          title: 'Jane',
          sortableValue: 'Jane',
        },
        age: 42,
      },
      { id: '3', name: { value: 'Joe', title: 'Joe Doe' }, age: 67 },
      { id: '4', name: { value: 'Jack' }, age: 22 },
    ],
    headers: [
      { id: 'id', label: 'ID' },
      { id: 'name', label: 'Name' },
      { id: 'age', label: 'Age' },
    ],
  };

  const row0 = props.rows[0];
  const row1 = props.rows[1];
  const row2 = props.rows[2];
  const row3 = props.rows[3];

  it('should render correctly', () => {
    const { container } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table stickyHeader variant="clean">
            <TableBody>
              <RocketsTable.BodyRow row={row0}>
                <RocketsTable.BodyCell row={row0} />
              </RocketsTable.BodyRow>
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const tableRow = container.querySelector('.MuiTableRow-root');
    expect(tableRow).toBeInTheDocument();
  });

  it('should render text, number and undefined cells correctly', () => {
    const { container } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table stickyHeader variant="clean">
            <TableBody>
              <RocketsTable.BodyRow row={row0}>
                <RocketsTable.BodyCell row={row0} />
              </RocketsTable.BodyRow>
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const tableRow = container.querySelector('.MuiTableRow-root');
    const tableRowChildren = tableRow?.children;
    const fistCellTextContent = tableRowChildren?.[0]?.textContent;
    const secondCellTextContent = tableRowChildren?.[1]?.textContent;
    const thrirdCellTextContent = tableRowChildren?.[2]?.textContent;
    expect(fistCellTextContent).toBe('1');
    expect(secondCellTextContent).toBe('');
    expect(thrirdCellTextContent).toBe('35');
  });

  it('should render custom component cell correctly', () => {
    const { container } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table stickyHeader variant="clean">
            <TableBody>
              <RocketsTable.BodyRow row={row1}>
                <RocketsTable.BodyCell row={row1} />
              </RocketsTable.BodyRow>
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const tableRow = container.querySelector('.MuiTableRow-root');
    const tableRowChildren = tableRow?.children;
    const secondCellTextContent = tableRowChildren?.[1]?.textContent;

    expect(secondCellTextContent).toBe('Jane Custom Component');
  });

  it('renders cell with value and title (tooltip)', async () => {
    const { container, getByText } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table stickyHeader variant="clean">
            <TableBody>
              <RocketsTable.BodyRow row={row2}>
                <RocketsTable.BodyCell row={row2} />
              </RocketsTable.BodyRow>
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const tableRow = container.querySelector('.MuiTableRow-root');
    const tableRowChildren = tableRow?.children;
    const secondCell = tableRowChildren?.[1];
    const span = secondCell?.querySelector('span');

    span && fireEvent.mouseOver(span);

    await waitFor(() => {
      const tooltip = getByText('Joe Doe');
      expect(tooltip).toBeInTheDocument();
    });
  });

  it('renders cell with value and no title (tooltip)', async () => {
    const { container, queryByRole } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table stickyHeader variant="clean">
            <TableBody>
              <RocketsTable.BodyRow row={row3}>
                <RocketsTable.BodyCell row={row3} />
              </RocketsTable.BodyRow>
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const tableRow = container.querySelector('.MuiTableRow-root');
    const tableRowChildren = tableRow?.children;
    const secondCell = tableRowChildren?.[1];
    const firstChild = secondCell?.children[0];

    firstChild && fireEvent.mouseOver(firstChild);

    await waitFor(() => {
      const tooltipRole = queryByRole('tooltip');
      expect(tooltipRole).not.toBeInTheDocument();
    });
  });
});
