'use client';

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

export const allOption: SelectOption = {
  value: 'all',
  label: 'All',
};

export type SelectOption = {
  value: string;
  label: string;
};

const getStatusValue = (value: string) => {
  return value === allOption.value ? null : value;
};

export type SelectFieldProps = {
  options: SelectOption[];
  defaultValue: string;
  hasAllOption?: boolean;
  isLoading?: boolean;
  onChange: (value: string | string[] | null) => void;
} & Omit<SelectProps, 'onChange'>;

const SelectField = ({
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

export default SelectField;
