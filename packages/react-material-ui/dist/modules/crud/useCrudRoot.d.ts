/// <reference types="react" />
import { UseTableResult } from '../../components/Table/useTable';
import { Search, SimpleFilter } from '../../components/Table/types';
import { FilterDetails } from '../../components/submodules/Filter';
export type FilterValues = Record<string, string | Date | null>;
export type CrudContextProps = {
    customFilter?: (data: FilterValues) => SimpleFilter | null;
    customSearch?: (data: FilterValues) => Search | null;
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
export declare const CrudContext: import("react").Context<CrudContextProps>;
export declare const useCrudRoot: () => CrudContextProps;
