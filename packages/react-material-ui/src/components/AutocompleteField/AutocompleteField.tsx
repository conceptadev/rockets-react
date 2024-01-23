'use client';

import React, { SyntheticEvent } from 'react';
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  TextField,
} from '@mui/material';
import {
  SelectOption,
  allOption,
} from '../../components/SelectField/SelectField';
import FormFieldSkeleton from '../../components/FormFieldSkeleton';

export type AutocompleteFieldProps = {
  options: SelectOption[];
  isLoading?: boolean;
  currentValue: string;
  defaultValue: SelectOption | undefined;
  label?: string;
  onChange: (value: string | null) => void;
} & Omit<
  AutocompleteProps<SelectOption, false, false, false>,
  'renderInput' | 'onChange'
>;

const AutocompleteField = ({
  options = [],
  isLoading = false,
  currentValue,
  defaultValue,
  label,
  onChange,
  ...rest
}: AutocompleteFieldProps) => {
  const handleRenderInput = (params: AutocompleteRenderInputParams) => (
    <FormFieldSkeleton isLoading={isLoading} hideLabel>
      <TextField {...params} label={label} />
    </FormFieldSkeleton>
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

  const optionsWithAll = [allOption, ...options];

  return (
    <Autocomplete
      disabled={isLoading}
      defaultValue={defaultValue}
      isOptionEqualToValue={(option) => option.value === currentValue}
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      options={optionsWithAll}
      renderInput={handleRenderInput}
      {...rest}
    />
  );
};

export default AutocompleteField;
