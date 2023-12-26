'use client';

import React, { SyntheticEvent } from 'react';
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  Box,
  TextField,
} from '@mui/material';
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
  label?: string;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
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
  label,
  renderInput,
  onChange,
  ...rest
}: AutocompleteFieldProps) => {
  const handleRenderInput = (params: AutocompleteRenderInputParams) => (
    <TextField {...params} label={label} />
  );

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    newValue: SelectOption | null,
    reason?: string,
  ) => {
    if (reason === 'clear') {
      onChange(allOption.value);
      return;
    }

    onChange(newValue?.value ?? null);
  };

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
      renderInput={renderInput ?? handleRenderInput}
      {...rest}
    />
  );
};

export default AutocompleteField;
