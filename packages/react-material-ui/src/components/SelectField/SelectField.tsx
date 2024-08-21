import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';

import { FormFieldSkeleton } from '../../components/FormFieldSkeleton';

/**
 * Default option representing "All" in the select field.
 */
export const allOption: SelectOption = {
  value: 'all',
  label: 'All',
};

/**
 * Option type used in the SelectField component.
 */
export type SelectOption = {
  /** The value of the option */
  value: string;
  /** The label to display for the option */
  label: string;
};

/**
 * Helper function to process the selected value.
 * If the value is the "All" option, it returns null.
 *
 * @param value - The selected value
 * @returns The processed value or null if "All" is selected
 */
const getStatusValue = (value: string) => {
  return value === allOption.value ? null : value;
};

/**
 * SelectField component props.
 */
export type SelectFieldProps = {
  /** Array of options to display in the select dropdown */
  options: SelectOption[];
  /** The default selected value */
  defaultValue: string;
  /** Whether to include the "All" option in the dropdown. True by default. */
  hasAllOption?: boolean;
  /** Whether the component is in a loading state */
  isLoading?: boolean;
  /** Callback function triggered when the selected value changes */
  onChange: (value: string | string[] | null) => void;
} & Omit<SelectProps, 'onChange'>;

/**
 * The SelectField component is a form control that allows users to select
 * an option from a dropdown menu. It supports features such as custom labels,
 * loading state, the inclusion of an "All" option, and various MUI Select props.
 * It's props extend from [Material UI's Select](https://mui.com/material-ui/api/select/#props) component props, so every
 * prop is interchangeable between those two.
 *
 * @see [Storybook - SelectField](https://storybook.rockets.tools/?path=/docs/selectfield)
 *
 * @example
 * ```tsx
 * <SelectField
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' },
 *     { value: 'option3', label: 'Option 3' },
 *   ]}
 *   defaultValue="option1"
 *   hasAllOption={true}
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 *
 * @param props - SelectField component props
 */
export const SelectField = ({
  options = [],
  defaultValue,
  hasAllOption = true,
  isLoading = false,
  label,
  onChange,
  fullWidth,
  size,
  variant = 'outlined',
  ...rest
}: SelectFieldProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    onChange(getStatusValue(value));
  };

  const finalOptions = [...(hasAllOption ? [allOption] : []), ...options];

  return (
    <Box>
      <FormFieldSkeleton isLoading={isLoading} hideLabel>
        <FormControl fullWidth={fullWidth} size={size}>
          <InputLabel id="select-label">{label}</InputLabel>
          <Select
            labelId="select-label"
            defaultValue={defaultValue ?? (hasAllOption && allOption.value)}
            onChange={handleChange}
            label={label}
            fullWidth={fullWidth}
            size={size}
            variant={variant}
            {...rest}
          >
            {finalOptions?.map((role) => (
              <MenuItem key={role.value} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormFieldSkeleton>
    </Box>
  );
};
