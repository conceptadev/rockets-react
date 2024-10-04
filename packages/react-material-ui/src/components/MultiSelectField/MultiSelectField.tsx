import React, { useState, useEffect } from 'react';
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';

import { FormFieldSkeleton } from '../FormFieldSkeleton';

/**
 * Default option representing "All" in the select field.
 */
export const allOption: SelectOption = {
  value: 'all',
  label: 'All',
};

/**
 * Option type used in the MultiSelectField component.
 */
export type SelectOption = {
  /** The value of the option */
  value: string;
  /** The label to display for the option */
  label: string;
};

/**
 * MultiSelectField component props.
 */
export type MultiSelectFieldProps = {
  /** Array of options to display in the select dropdown */
  options: SelectOption[];
  /** The default selected value */
  defaultValue?: string[];
  /** Whether to include the "All" option in the dropdown. True by default. */
  hasAllOption?: boolean;
  /** Whether the component is in a loading state */
  isLoading?: boolean;
  /** Callback function triggered when the selected value changes */
  onChange: (value: string[]) => void;
  /** Wether the component show show a "Confirm" button to save changes */
  showConfirmButton?: boolean;
} & Omit<SelectProps<string[]>, 'onChange'>;

export const MultiSelectField = ({
  options = [],
  defaultValue,
  hasAllOption = true,
  isLoading = false,
  label,
  onChange,
  fullWidth,
  size,
  variant = 'outlined',
  value,
  showConfirmButton,
  ...rest
}: MultiSelectFieldProps) => {
  const [_value, _setValue] = useState<string[]>(value || defaultValue || []);

  useEffect(() => {
    // Array.isArray(value) && _value !== value && _setValue(value);
    Array.isArray(value) && _setValue(value);
  }, [value]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    let values = typeof value === 'string' ? value.split(',') : value;

    if (values.includes(allOption.value) && hasAllOption) {
      values = [];
    }

    // TODO handle allOption click
    // value === allOption.value ? [] : value;
    {
      showConfirmButton ? _setValue(values) : onChange(values);
    }
  };

  const finalOptions = [...(hasAllOption ? [allOption] : []), ...options];

  const renderValue = (selected: string[]) => {
    if (selected.length === 0 && hasAllOption) return allOption.label;

    let valueString: string = selected
      .map(
        (selectedItem: string) =>
          options?.find((item) => item.value === selectedItem)?.label,
      )
      .join(', ');

    return valueString;
  };

  return (
    <FormFieldSkeleton isLoading={isLoading} hideLabel>
      <FormControl fullWidth={fullWidth} size={size}>
        <InputLabel
          id="multiselect-label"
          shrink={hasAllOption || !!_value.length}
          className="Rockets-MultiSelect-InputLabel"
        >
          {label}
        </InputLabel>
        <Select
          labelId="multiselect-label"
          className="Rockets-MultiSelect"
          defaultValue={
            defaultValue || (hasAllOption && [allOption.value]) || []
          }
          onChange={handleChange}
          label={label}
          fullWidth={fullWidth}
          size={size}
          variant={variant}
          value={_value}
          multiple
          renderValue={renderValue}
          displayEmpty={hasAllOption}
          {...rest}
        >
          {finalOptions?.map((opt) => {
            const { value, label } = opt;
            const checked = _value.includes(value);

            return (
              <MenuItem
                key={value}
                value={value}
                className="Rockets-MultiSelect-MenuItem"
              >
                <Checkbox
                  checked={checked}
                  className="Rockets-MultiSelect-MenuItem-Checkbox"
                />
                <ListItemText
                  primary={label}
                  className="Rockets-MultiSelect-ListItemText"
                />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </FormFieldSkeleton>
  );
};
