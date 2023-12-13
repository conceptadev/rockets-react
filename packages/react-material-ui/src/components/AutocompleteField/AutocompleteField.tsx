'use client';

import React, { ReactNode, SyntheticEvent } from 'react';
import { Autocomplete, AutocompleteProps, Box, TextField } from '@mui/material';
import {
  SelectOption,
  allOption,
} from '../../components/SelectField/SelectField';
import FormFieldSkeleton from '../../components/FormFieldSkeleton';

export type AutocompleteFieldProps = {
  options: SelectOption[];
  isLoading: boolean;
  currentValue: string;
  defaultValue: SelectOption | undefined;
  labelComponent?: ReactNode;
  onChange: (value: string | null) => void;
} & Omit<
  AutocompleteProps<SelectOption, false, false, false>,
  'renderInput' | 'onChange'
>;

const AutocompleteField = ({
  options = [],
  isLoading,
  currentValue,
  defaultValue,
  labelComponent,
  onChange,
  ...rest
}: AutocompleteFieldProps) => {
  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    newValue: SelectOption | null,
  ) => onChange(newValue?.value ?? null);

  if (isLoading) {
    return (
      <Box width={300}>
        <FormFieldSkeleton hideLabel />
      </Box>
    );
  }

  const optionsWithAll = [allOption, ...options];

  return (
    <Autocomplete
      defaultValue={defaultValue}
      isOptionEqualToValue={(option) => option.value === currentValue}
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      options={optionsWithAll}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            ...(labelComponent && {
              startAdornment: labelComponent,
            }),
          }}
        />
      )}
      {...rest}
    />
  );
};

export default AutocompleteField;
