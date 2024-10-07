/// <reference types="react" />
import { TextFieldProps } from '@mui/material';
export type SearchFieldProps = {
    searchIconPlacement?: 'start' | 'end';
    defaultValue?: string;
    wait?: number;
    onDebouncedSearchChange?: (value: string) => void;
    onClear?: () => void;
} & TextFieldProps;
declare const SearchField: ({ searchIconPlacement, defaultValue, wait, onDebouncedSearchChange, onClear, placeholder, onChange, ...props }: SearchFieldProps) => JSX.Element;
export default SearchField;
