'use client';

import { createContext, useContext } from 'react';
import { UseTableResult } from '../../components/Table/useTable';
import { Search } from '../../components/Table/types';
import { FilterDetails } from '../../components/submodules/Filter';

export type FilterValues = Record<string, string | Date | null>;

export type CrudContextProps = {
  filters: FilterDetails[];
  search: UseTableResult['search'];
  updateSearch: UseTableResult['updateSearch'];
  simpleFilter: UseTableResult['simpleFilter'];
  updateSimpleFilter: UseTableResult['updateSimpleFilter'];
  externalSearch: Search;
  filterValues: FilterValues;
  setFilterValues: React.Dispatch<React.SetStateAction<FilterValues>>;
  navigate?: (path: string) => void;
};

export const CrudContext = createContext<CrudContextProps>(
  {} as CrudContextProps,
);

export const useCrudRoot = () => {
  const tableRootContext = useContext(CrudContext);

  return tableRootContext;
};
