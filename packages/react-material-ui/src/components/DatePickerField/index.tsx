import React, { useState, useEffect, useRef, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';

type DatePickerFieldProps = {
  wait?: number;
  onDebouncedSearchChange?: (searchTerm: Date | null) => void;
} & DatePickerProps<Date>;

const DatePickerField = ({
  defaultValue,
  wait = 500,
  onDebouncedSearchChange,
  onChange,
  ...props
}: DatePickerFieldProps) => {
  const firstRender = useRef(true);
  const [search, setSearch] = useState<Date | null>(defaultValue);

  const value = typeof props.value !== 'undefined' ? props.value : search;

  const handleDebouncedSearch =
    onDebouncedSearchChange &&
    useMemo(() => debounce(onDebouncedSearchChange, wait), []);

  const handleChange = (value: Date | null, context) => {
    setSearch(value);
    onChange?.(value, context);
    handleDebouncedSearch?.(value);
  };

  useEffect(() => {
    // Keep track of the first render to avoid triggering onDebouncedSearchChange
    // on the initial render. Only trigger when the 'value' changes.
    if (!firstRender.current) {
      handleDebouncedSearch?.(value);
    } else {
      firstRender.current = false;
    }
    // Avoid adding handleDebouncedSearch to the dependency array
    // to prevent an infinite loop.

    return () => handleDebouncedSearch?.cancel();
  }, [value, defaultValue]);

  return (
    <DatePicker
      defaultValue={defaultValue}
      onChange={handleChange}
      format="MM-dd-yyyy"
      slotProps={{
        field: {
          clearable: true,
          onClear: () => {
            handleDebouncedSearch?.(null);
          },
        },
        textField: {
          size: 'small',
        },
      }}
      {...props}
      value={value}
    />
  );
};

export default DatePickerField;
