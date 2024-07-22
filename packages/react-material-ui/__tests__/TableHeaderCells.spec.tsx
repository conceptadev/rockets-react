/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Table as RocketsTable } from '../src/';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableBodyRows } from '../src/components/Table/TableBody/TableBodyRows';
import { HeaderProps } from '../src/components/Table/types';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('TableHeaderCells component', () => {
  const props = {
    rows: [],
    headers: [
      { id: 'id', label: 'ID' },
      { id: 'name', label: 'Name' },
      { id: 'age', label: 'Age' },
    ],
  };

  it('should render default header cells correctly', () => {
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
              <TableBodyRows />
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const tableHeaders = container.querySelectorAll('th');
    expect(tableHeaders).toHaveLength(3);
    expect(tableHeaders[0]).toHaveTextContent('ID');
    expect(tableHeaders[1]).toHaveTextContent('Name');
    expect(tableHeaders[2]).toHaveTextContent('Age');
  });

  it('should render custom cells correctly if renderCell is provided', () => {
    const renderCell = (headerProps: HeaderProps) => (
      <td>Custom header {headerProps.label}</td>
    );

    const { getAllByText } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table>
            <TableHead>
              <TableRow>
                <RocketsTable.HeaderCells renderCell={renderCell} />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableBodyRows />
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const customHeaders = getAllByText('Custom header', { exact: false });
    expect(customHeaders).toHaveLength(3);
    expect(customHeaders[0]).toHaveTextContent('Custom header ID');
    expect(customHeaders[1]).toHaveTextContent('Custom header Name');
    expect(customHeaders[2]).toHaveTextContent('Custom header Age');
  });

  it('should apply correct width if provided', () => {
    const customHeaders = [
      { id: 'id', label: 'ID' },
      { id: 'name', label: 'Name' },
      { id: 'age', label: 'Age', width: 123 },
    ];
    const { getByText } = render(
      <RocketsTable.Root {...props} headers={customHeaders}>
        <TableContainer>
          <RocketsTable.Table>
            <TableHead>
              <TableRow>
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

    const ageHeader = getByText('Age');
    expect(ageHeader).toHaveStyle('width: 123');
  });
});
