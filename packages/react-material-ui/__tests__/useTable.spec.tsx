/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import useTable from '../src/components/Table/useTable';

describe('useTable', () => {
  it('should return the initial state correctly', () => {
    const { result } = renderHook(() => useTable('test'));

    expect(result.current.data).toEqual(undefined);
    expect(result.current.isPending).toBe(true);
    expect(result.current.error).toBe(undefined);
    expect(result.current.simpleFilter).toBe(undefined);
    expect(result.current.search).toBe(undefined);
    expect(result.current.total).toBe(undefined);
    expect(result.current.pageCount).toBe(undefined);
    expect(result.current.tableQueryState).toEqual({
      order: 'asc',
      orderBy: 'id',
      rowsPerPage: 5,
      page: 1,
      simpleFilter: undefined,
      search: undefined,
    });
  });
});
