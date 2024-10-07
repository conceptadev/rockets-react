/// <reference types="react" />
import { AutocompleteProps } from '@mui/material';
import { SelectOption } from '../../components/SelectField/SelectField';
import { SimpleFilter } from 'components/Table/types';
export type AutocompleteFieldProps = {
    value?: string | null;
    options?: SelectOption[];
    sort?: string;
    filters?: SimpleFilter;
    resourceLabel?: string;
    resourceValue?: string;
    resource?: string;
    label?: string;
    isLoading?: boolean;
    onChange?: (value: string | null) => void;
} & Omit<AutocompleteProps<SelectOption, false, false, false>, 'renderInput' | 'onChange' | 'value' | 'options'>;
declare const AutocompleteField: ({ value, options, sort, filters, resourceLabel, resourceValue, label, resource, isLoading, defaultValue, onChange, ...rest }: AutocompleteFieldProps) => JSX.Element;
export default AutocompleteField;
