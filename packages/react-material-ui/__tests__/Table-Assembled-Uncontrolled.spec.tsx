/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React, { FC } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Table as RocketsTable } from '../src';
import { RowProps, HeaderProps } from '../src/components/Table/types';
import useTable from '../src/components/Table/useTable';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface Props {
  headers: HeaderProps[];
  hasCheckboxes?: boolean;
}

const TableAssembledUncontrolled: FC<Props> = ({ headers, hasCheckboxes }) => {
  const { data, total, pageCount, tableQueryState, setTableQueryState } =
    useTable('user', {
      rowsPerPage: 5,
    });

  return (
    <RocketsTable.Root
      rows={data as RowProps[]}
      headers={headers}
      total={total}
      pageCount={pageCount}
      tableQueryState={tableQueryState}
      updateTableQueryState={setTableQueryState}
    >
      <TableContainer>
        <RocketsTable.Table>
          <TableHead>
            <TableRow>
              {hasCheckboxes && <RocketsTable.HeaderCheckbox />}
              <RocketsTable.HeaderCells />
            </TableRow>
          </TableHead>
          <TableBody>
            {!hasCheckboxes ? (
              <RocketsTable.BodyRows />
            ) : (
              <RocketsTable.BodyRows
                renderRow={(row, labelId) => (
                  <RocketsTable.BodyRow row={row} key={row.id}>
                    <RocketsTable.BodyCheckboxes row={row} labelId={labelId} />
                    <RocketsTable.BodyCell row={row} />
                  </RocketsTable.BodyRow>
                )}
              />
            )}
          </TableBody>
        </RocketsTable.Table>
        <RocketsTable.Pagination variant="clean" />
      </TableContainer>
    </RocketsTable.Root>
  );
};

const mockData = [
  {
    id: '1',
    name: 'Test Name 1',
    age: '11',
  },
  {
    id: '2',
    name: 'Test Name 2',
    age: '12',
  },
  {
    id: '3',
    name: 'Test Name 3',
    age: '13',
  },
  {
    id: '4',
    name: 'Test Name 4',
    age: '14',
  },
  {
    id: '5',
    name: 'Test Name 5',
    age: '15',
  },
];

jest.mock('next/navigation', () => ({
  useRouter: () => {
    return {
      replace: jest.fn(),
    };
  },
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

const execute = jest.fn();
const refresh = jest.fn();

jest.mock('@concepta/react-data-provider', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    del: jest.fn(),
  })),
  useQuery: jest.fn(() => ({
    status: 'success',
    data: {
      count: 5,
      total: 7,
      page: 1,
      pageCount: 2,
      data: mockData,
    },
    error: undefined,
    isPending: false,
    execute: execute,
    refresh: refresh,
  })),
}));

beforeEach(() => {
  execute.mockReset();
  refresh.mockReset();
});

describe('Assembled Table - Controlled', () => {
  const headers = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Name' },
    { id: 'age', label: 'Age' },
  ];

  it('should render correctly', () => {
    render(<TableAssembledUncontrolled headers={headers} />);

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('should render correct headers', () => {
    const { container } = render(
      <TableAssembledUncontrolled headers={headers} />,
    );

    const tableHeaders = container.querySelectorAll('th');
    expect(tableHeaders).toHaveLength(3);
    expect(tableHeaders[0]).toHaveTextContent('ID');
    expect(tableHeaders[1]).toHaveTextContent('Name');
    expect(tableHeaders[2]).toHaveTextContent('Age');
  });

  it('should render correct number of rows and correct data', () => {
    const { container } = render(
      <TableAssembledUncontrolled headers={headers} />,
    );
    const tableRows = container.querySelectorAll('tr');
    expect(tableRows).toHaveLength(6); // 1 header + 5 body rows

    const tableCells = container.querySelectorAll('td');

    for (let i = 0; i < tableCells.length; i++) {
      const row = Math.floor(i / 3);
      const header = i % 3;

      expect(tableCells[i].textContent).toBe(mockData[row][headers[header].id]);
    }
  });

  it('should select a row / check if row is selected', () => {
    const { container } = render(
      <TableAssembledUncontrolled
        headers={[{ id: 'checkbox', label: '' }, ...headers]}
        hasCheckboxes
      />,
    );

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(6);

    fireEvent.click(checkboxes[1]);
    fireEvent.click(checkboxes[3]);

    const selectedCheckboxes = container.querySelectorAll(
      'input[type="checkbox"]:checked',
    );

    expect(selectedCheckboxes).toHaveLength(2);
  });

  it('should handle select all rows / check if rows are selected', () => {
    const { container } = render(
      <TableAssembledUncontrolled
        headers={[{ id: 'checkbox', label: '' }, ...headers]}
        hasCheckboxes
      />,
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
      <TableAssembledUncontrolled headers={headers} />,
    );

    const nextPageButton = container.querySelector(
      'button[aria-label="Go to next page"]',
    );

    expect(nextPageButton).toBeInTheDocument();
    const paginationInfo = container.querySelector(
      '.MuiTablePagination-displayedRows',
    );
    expect(paginationInfo).toHaveTextContent('1–5 of 7');

    nextPageButton && fireEvent.click(nextPageButton);

    expect(paginationInfo).toHaveTextContent('6–7 of 7');
  });

  it('should handle change of rows per page', () => {
    const { container, getAllByRole, getByRole } = render(
      <TableAssembledUncontrolled headers={headers} />,
    );

    const paginationSelect = getByRole('combobox');
    paginationSelect && fireEvent.mouseDown(paginationSelect);

    const options = getAllByRole('option');

    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('5');
    expect(options[1]).toHaveTextContent('10');
    expect(options[2]).toHaveTextContent('25');

    expect(execute).toHaveBeenCalledTimes(1);

    fireEvent.click(options[1]);

    expect(execute).toHaveBeenCalledTimes(2);
  });

  it('should execute get request automatically', () => {
    render(<TableAssembledUncontrolled headers={headers} />);

    expect(execute).toHaveBeenCalledTimes(1);
  });

  it('should fire execute after change of column order', () => {
    const { getByText } = render(
      <TableAssembledUncontrolled headers={headers} />,
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

    expect(execute).toHaveBeenCalledTimes(4);
  });
});
