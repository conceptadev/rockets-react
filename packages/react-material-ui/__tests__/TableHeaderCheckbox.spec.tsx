/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Table as RocketsTable } from '../src/';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableBodyRows } from '../src/components/Table/TableBody/TableBodyRows';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('TableHeaderCheckbox component', () => {
  const props = {
    rows: [
      { id: '2', name: 'mockName 2', age: 2 },
      { id: '0', name: 'mockName 0', age: 0 },
      { id: '1', name: 'mockName 1', age: 1 },
    ],
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
                <RocketsTable.HeaderCheckbox />
                <RocketsTable.HeaderCells />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableBodyRows />
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );
  });

  it('should select all rows when checkbox is clicked', () => {
    const { getByLabelText, container } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table>
            <TableHead>
              <TableRow>
                <RocketsTable.HeaderCheckbox />
                <RocketsTable.HeaderCells />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableBodyRows />
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const checkbox = getByLabelText('select all');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  it('should render minus button if numSelected is > 0', () => {
    const { getByLabelText, container } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table>
            <TableHead>
              <TableRow>
                <RocketsTable.HeaderCheckbox />
                <RocketsTable.HeaderCells />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableBodyRows />
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const checkbox = getByLabelText('select all');
    const checkboxParent = checkbox.parentElement;

    // get the secont row checkbox
    const firstRowCheckbox = container.querySelectorAll(
      'input[type="checkbox"]',
    )[1];
    firstRowCheckbox && fireEvent.click(firstRowCheckbox);

    // find the minus icon under the checkboxParent
    const minusButton = checkboxParent?.querySelector(
      '[data-testid="CheckBoxOutlineBlankIcon"]',
    );
    expect(minusButton).toBeInTheDocument();
  });
});
