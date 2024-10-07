/// <reference types="react" />
import { SelectProps } from '@mui/material';
export declare const allOption: SelectOption;
export type SelectOption = {
    value: string;
    label: string;
};
export type SelectFieldProps = {
    options: SelectOption[];
    defaultValue: string;
    hasAllOption?: boolean;
    isLoading?: boolean;
    onChange: (value: string | string[] | null) => void;
} & Omit<SelectProps, 'onChange'>;
export declare const SelectField: ({ options, defaultValue, hasAllOption, isLoading, label, onChange, fullWidth, size, variant, ...rest }: SelectFieldProps) => JSX.Element;
