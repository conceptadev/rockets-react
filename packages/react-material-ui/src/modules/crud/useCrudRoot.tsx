'use client';

import { createContext, useContext } from 'react';
import { UseTableResult } from '../../components/Table/useTable';
import { Search } from '../../components/Table/types';
import { FilterDetails } from '../../components/submodules/Filter';

export type FilterValues = Record<string, string | Date | null>;

export type CrudContextProps = {
  /**
   * Array of objects, where each contain details regarding filter inputs.
   */
  filters: FilterDetails[];
  /**
   * Object for filtering Table data in a more intricate way, including contain and equal operators.
   */
  search: UseTableResult['search'];
  /**
   * Callback for updating Table filtering based on URL params.
   *
   * @param search - The new value for the search attribute.
   * @param resetPage - Boolean that indicates if the current page should be set to one.
   */
  updateSearch: UseTableResult['updateSearch'];
  /**
   * Object that represents filters for Table data.
   */
  simpleFilter: UseTableResult['simpleFilter'];
  /**
   * Callback for updating the Table filter object.
   */
  updateSimpleFilter: UseTableResult['updateSimpleFilter'];
  /**
   * Complement for the default Table search.
   */
  externalSearch: Search;
  /**
   * Object containing values of filter inputs.
   */
  filterValues: FilterValues;
  /**
   * Callback for managing filter values dinamically.
   */
  setFilterValues: React.Dispatch<React.SetStateAction<FilterValues>>;
};

export const CrudContext = createContext<CrudContextProps>(
  {} as CrudContextProps,
);

/**
 * Custom hook that wraps the implementation of the Crud Root context.
 */
export const useCrudRoot = () => {
  const tableRootContext = useContext(CrudContext);

  return tableRootContext;
};
