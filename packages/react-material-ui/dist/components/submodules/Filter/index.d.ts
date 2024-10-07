import { ReactNode } from 'react';
import { FilterVariant, FilterCommon, TextFilter } from '../../../components/Filter';
import { SelectOption } from '../../../components/SelectField/SelectField';
import { FilterValues } from '../../../modules/crud/useCrudRoot';
type Operator = 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'starts' | 'ends' | 'cont' | 'excl' | 'eqL' | 'neL' | 'startsL' | 'endsL' | 'contL' | 'exclL';
export type FilterDetails = {
    type: FilterVariant;
    resource?: string;
    resourceLabel?: string;
    resourceValue?: string;
    operator?: Operator;
    options?: SelectOption[];
    searchIconPlacement?: TextFilter['searchIconPlacement'];
} & Omit<FilterCommon, 'showOnMount' | 'hide'>;
export type FilterCallback = (filter: FilterValues) => void;
type Props = {
    orderableListCacheKey?: string;
    cacheApiPath?: string;
    complementaryActions?: ReactNode;
};
declare const FilterSubmodule: (props: Props) => JSX.Element;
export default FilterSubmodule;
