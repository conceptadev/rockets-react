/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Table as RocketsTable } from '../src/';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableBodyRows } from '../src/components/Table/TableBody/TableBodyRows';

jest.mock('next/navigation', () => ({
  useRouter: () => {
    return {
      pathname: '/fakePath',
      push: jest.fn(),
      replace: jest.fn(),
    };
  },
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('TableHeaderCell component', () => {
  const props = {
    // unordered rows to test sorting
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
                {props.headers.map((header) => (
                  <RocketsTable.HeaderCell key={header.id} cell={header} />
                ))}
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

  it('should sort rows when clicked', async () => {
    const { getByText, queryAllByText } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table>
            <TableHead>
              <TableRow>
                {props.headers.map((header) => (
                  <RocketsTable.HeaderCell key={header.id} cell={header} />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableBodyRows />
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const mockNames = queryAllByText('mockName', { exact: false });
    expect(mockNames).toHaveLength(3);
    expect(mockNames[0]).toHaveTextContent('mockName 0');
    expect(mockNames[1]).toHaveTextContent('mockName 1');
    expect(mockNames[2]).toHaveTextContent('mockName 2');

    const idHeader = getByText('ID');

    fireEvent.click(idHeader);

    await waitFor(() => {
      const sortedDescending = getByText('sorted descending');
      expect(sortedDescending).toBeInTheDocument();
    });

    const mockNamesAfterClick = queryAllByText('mockName', { exact: false });
    expect(mockNamesAfterClick).toHaveLength(3);
    expect(mockNamesAfterClick[0]).toHaveTextContent('mockName 2');
    expect(mockNamesAfterClick[1]).toHaveTextContent('mockName 1');
    expect(mockNamesAfterClick[2]).toHaveTextContent('mockName 0');
  });

  it('should render sort direction indicator only when active', async () => {
    const { getByText } = render(
      <RocketsTable.Root {...props}>
        <TableContainer>
          <RocketsTable.Table>
            <TableHead>
              <TableRow>
                {props.headers.map((header) => (
                  <RocketsTable.HeaderCell key={header.id} cell={header} />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableBodyRows />
            </TableBody>
          </RocketsTable.Table>
        </TableContainer>
      </RocketsTable.Root>,
    );

    const nameHeader = getByText('Name');

    const orderIcon = nameHeader.querySelector('svg');
    expect(orderIcon).toHaveStyle('opacity: 0');

    const sortedDescending = nameHeader.querySelector('span');
    expect(sortedDescending).not.toBeInTheDocument();

    fireEvent.click(nameHeader);

    await waitFor(() => {
      const sortedAscending = nameHeader.querySelector('span');
      expect(sortedAscending).toHaveTextContent('sorted ascending');
    });

    fireEvent.click(nameHeader);

    await waitFor(() => {
      const sortedDescending = nameHeader.querySelector('span');
      expect(sortedDescending).toHaveTextContent('sorted descending');
    });
  });

  it('should render only label when not sortable', () => {
    const customHeaders = [
      { id: 'id', label: 'ID' },
      { id: 'name', label: 'Name' },
      {
        id: 'age',
        label: 'Age',
        sortable: false,
      },
    ];
    const { getByText } = render(
      <RocketsTable.Root {...props} headers={customHeaders}>
        <TableContainer>
          <RocketsTable.Table>
            <TableHead>
              <TableRow>
                {customHeaders.map((header) => (
                  <RocketsTable.HeaderCell key={header.id} cell={header} />
                ))}
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
    const sortingSpan = ageHeader.querySelector('span');
    expect(sortingSpan).not.toBeInTheDocument();
  });

  it('should apply correct width if provided', () => {
    const customHeaders = [
      { id: 'id', label: 'ID' },
      { id: 'name', label: 'Name' },
      { id: 'age', label: 'Age', width: 123, sortable: false },
    ];
    const { getByText } = render(
      <RocketsTable.Root {...props} headers={customHeaders}>
        <TableContainer>
          <RocketsTable.Table>
            <TableHead>
              <TableRow>
                {customHeaders.map((header) => (
                  <RocketsTable.HeaderCell key={header.id} cell={header} />
                ))}
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
