import { ReactNode } from 'react';
import { GridProps } from '@mui/material/Grid';
import { SelectFieldProps, SelectOption } from '../../components/SelectField/SelectField';
import { SearchFieldProps } from '../../components/SearchField/SearchField';
import { ListItem } from '../OrderableDropDown';
import { DatePickerProps } from '@mui/x-date-pickers';
export type FilterVariant = 'text' | 'autocomplete' | 'select' | 'date';
export type FilterCommon = {
    id: string;
    label: string;
    isLoading?: boolean;
    columns?: number;
    size?: SearchFieldProps['size'] | SelectFieldProps['size'];
    showOnMount?: boolean;
    hide?: boolean;
};
export type TextFilter = {
    type: 'text';
    helperText?: string;
    placeholder?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onDebouncedSearchChange?: (value: string) => void;
    value?: string;
    searchIconPlacement?: SearchFieldProps['searchIconPlacement'];
} & FilterCommon;
type DateFilter = {
    type: 'date';
    onChange: (value: Date | null) => void;
    onDebouncedSearchChange?: (value: Date) => void;
} & FilterCommon & DatePickerProps<Date>;
type AutocompleteFilter = {
    type: 'autocomplete';
    value?: string | null;
    options?: SelectOption[];
    resource?: string;
    resourceLabel?: string;
    resourceValue?: string;
    defaultValue?: SelectOption;
    onChange: (value: string | null) => void;
} & FilterCommon;
type SelectFilter = {
    type: 'select';
    options: SelectOption[];
    multiple?: boolean;
    defaultValue?: string;
    size?: SelectFieldProps['size'];
    onChange: (value: string | string[] | null) => void;
    value?: string | string[] | null;
} & FilterCommon;
export type FilterType = TextFilter | DateFilter | AutocompleteFilter | SelectFilter;
export type FilterProps = {
    filters: FilterType[];
    minimumFilters?: number;
    hasAllOption?: boolean;
    children?: ReactNode;
    additionalGridItems?: {
        component: ReactNode | ((filters: ListItem[]) => ReactNode);
        columns?: number;
    }[];
    complementaryActions?: ReactNode | ((filters: ListItem[]) => ReactNode);
    orderableListCacheKey?: string;
    cacheApiPath?: string;
} & GridProps;
export declare const Filter: (props: FilterProps) => JSX.Element;
export {};
