'use client';

import React from 'react';
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';

import FormFieldSkeleton from '../../components/FormFieldSkeleton';

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
  label: string;
  isLoading?: boolean;
  onChange: (value: string | null) => void;
} & Omit<SelectProps, 'onChange'>;

const SelectField = ({
  options = [],
  defaultValue,
  label,
  isLoading = false,
  onChange,
  ...rest
}: SelectFieldProps) => {
  const handleRenderValue = (value: string) => {
    if (value === allOption.value) return `${label}: ${allOption.label}`;
    const optionLabel = optionsWithAll?.find(
      (label) => label.value === value,
    )?.label;

    return `${label}: ${optionLabel}`;
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    onChange(getStatusValue(value));
  };

  if (isLoading) {
    return (
      <Box width={190}>
        <FormFieldSkeleton hideLabel />
      </Box>
    );
  }

  const optionsWithAll = [allOption, ...options];

  return (
    <Select
      defaultValue={defaultValue ?? 'all'}
      renderValue={handleRenderValue}
      onChange={handleChange}
      {...rest}
    >
      {optionsWithAll?.map((role) => (
        <MenuItem key={role.value} value={role.value}>
          {role.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectField;
