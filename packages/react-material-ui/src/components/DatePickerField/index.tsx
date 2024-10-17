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
  ...props
}: DatePickerFieldProps) => {
  const firstRender = useRef(true);
  const [search, setSearch] = useState<Date | null>(null);

  const handleDebouncedSearch = useMemo(
    () => onDebouncedSearchChange && debounce(onDebouncedSearchChange, wait),
    [wait, props?.value],
  );

  const handleChange = (value: Date | null) => setSearch(value);

  useEffect(() => {
    // Keep track of the first render to avoid triggering onDebouncedSearchChange
    // on the initial render. Only trigger when the 'value' changes.
    if (!firstRender.current) {
      handleDebouncedSearch?.(props?.value ?? search);
    } else {
      firstRender.current = false;
    }
    // Avoid adding onDebouncedSearchChange to the dependency array
    // to prevent an infinite loop.
  }, [search, props.value]);

  return (
    <DatePicker
      defaultValue={defaultValue}
      value={search}
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
    />
  );
};

export default DatePickerField;
