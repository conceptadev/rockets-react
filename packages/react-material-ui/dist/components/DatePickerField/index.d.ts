/// <reference types="react" />
import { DatePickerProps } from '@mui/x-date-pickers';
type DatePickerFieldProps = {
    wait?: number;
    onDebouncedSearchChange?: (searchTerm: Date | null) => void;
} & DatePickerProps<Date>;
declare const DatePickerField: ({ defaultValue, wait, onDebouncedSearchChange, ...props }: DatePickerFieldProps) => JSX.Element;
export default DatePickerField;
