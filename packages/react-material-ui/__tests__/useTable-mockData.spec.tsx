/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react';
import useTable from '../src/components/Table/useTable';
import { TableQueryStateProps, Order } from '../src/components/Table/types';

beforeEach(() => {
  jest.clearAllMocks();
});

const mockData = [
  {
    id: '1',
    name: 'Test Name 1',
  },
  {
    id: '2',
    name: 'Test Name 2',
  },
  {
    id: '3',
    name: 'Test Name 3',
  },
  {
    id: '4',
    name: 'Test Name 4',
  },
  {
    id: '5',
    name: 'Test Name 5',
  },
  {
    id: '6',
    name: 'Test Name 6',
  },
  {
    id: '7',
    name: 'Test Name 7',
  },
  {
    id: '8',
    name: 'Test Name 8',
  },
  {
    id: '9',
    name: 'Test Name 9',
  },
  {
    id: '10',
    name: 'Test Name 10',
  },
  {
    id: '11',
    name: 'Test Name 11',
  },
  {
    id: '12',
    name: 'Test Name 12',
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

const executeMock = jest.fn();
const refreshMock = jest.fn();

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
      count: 2,
      total: 12,
      page: 1,
      pageCount: 3,
      data: mockData,
    },
    error: undefined,
    isPending: false,
    execute: executeMock,
    refresh: refreshMock,
  })),
}));

describe('useTable', () => {
  it('should execute the data request automatically', () => {
    renderHook(() => useTable('test'));

    expect(executeMock).toBeCalledTimes(1);
  });

  it("should call useQuery's refresh after calling useTable's refresh", () => {
    const { result } = renderHook(() => useTable('test'));

    expect(executeMock).toBeCalledTimes(1);

    act(() => {
      result.current.refresh();
    });

    expect(refreshMock).toBeCalledTimes(1);
  });

  it('should return correct data after request', () => {
    const { result } = renderHook(() => useTable('test'));

    expect(result.current.data).toEqual(mockData);
  });

  it('should show isPending false after request', () => {
    const { result } = renderHook(() => useTable('test'));

    expect(result.current.isPending).toBe(false);
  });

  it('should show correct total number after request', () => {
    const { result } = renderHook(() => useTable('test'));

    expect(result.current.total).toBe(12);
  });

  it('should show correct pageCount after request', () => {
    const { result } = renderHook(() => useTable('test'));

    expect(result.current.pageCount).toBe(3);
  });

  it('should update the simple filter data correctly after calling "updateSimpleFilter"', () => {
    const { result } = renderHook(() => useTable('/resource'));

    act(() => {
      result.current.updateSimpleFilter({ name: '||eq||JohnDoe' });
    });

    expect(result.current.tableQueryState.simpleFilter).toEqual({
      name: '||eq||JohnDoe',
    });
  });

  it('should update the search data after correctly after calling "updateSearch"', () => {
    const { result } = renderHook(() => useTable('/resource'));

    const search = {
      name: { $contL: 'John Doe' },
      company: { $in: ['Company A', 'Company B'] },
    };

    act(() => {
      result.current.updateSearch(search);
    });

    expect(result.current.tableQueryState.search).toEqual(search);
  });

  it('should update tableState correctly after calling "setTableQueryState"', () => {
    const { result } = renderHook(() => useTable('/resource'));

    const tableState: TableQueryStateProps = {
      order: Order.Desc,
      orderBy: 'id',
      rowsPerPage: 10,
      page: 2,
      simpleFilter: { name: 'John Doe' },
      search: {
        name: { $contL: 'John Doe' },
        company: { $in: ['Company A', 'Company B'] },
      },
    };

    act(() => {
      result.current.setTableQueryState(tableState);
    });

    expect(result.current.tableQueryState).toEqual(tableState);
  });
});
