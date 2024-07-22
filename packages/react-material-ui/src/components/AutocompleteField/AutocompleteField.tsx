'use client';

import React, { SyntheticEvent, useEffect, useState } from 'react';
import Autocomplete, {
  AutocompleteProps,
  AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {
  SelectOption,
  allOption,
} from '../../components/SelectField/SelectField';
import FormFieldSkeleton from '../../components/FormFieldSkeleton';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import { SimpleFilter } from 'components/Table/types';

export type AutocompleteFieldProps = {
  value?: string | null;
  options?: SelectOption[];
  sort?: string;
  filters?: SimpleFilter;
  resourceLabel?: string;
  resourceValue?: string;
  resource?: string;
  label?: string;
  isLoading?: boolean;
  onChange?: (value: string | null) => void;
} & Omit<
  AutocompleteProps<SelectOption, false, false, false>,
  'renderInput' | 'onChange' | 'value' | 'options'
>;

const AutocompleteField = ({
  value,
  options = [],
  sort,
  filters,
  resourceLabel = 'name',
  resourceValue = 'id',
  label,
  resource,
  isLoading = false,
  defaultValue,
  onChange,
  ...rest
}: AutocompleteFieldProps) => {
  const { get } = useDataProvider();

  const [_value, setValue] = useState(value ?? defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value ?? defaultValue : _value;

  const simpleFilterQuery = () => {
    if (!filters) return;

    const queryArr = [];
    for (const [key, value] of Object.entries(filters)) {
      queryArr.push(`${key}${value}`);
    }
    return queryArr as string[];
  };

  const getResource = () => {
    return get({
      uri: `/${resource}`,
      queryParams: {
        sort,
        filters: simpleFilterQuery(),
      },
    });
  };

  const { execute, data, isPending } = useQuery<unknown[]>(getResource, false);

  const resourceOptions = [
    ...(data?.map((resource) => ({
      value: resource[resourceValue],
      label: resource[resourceLabel],
    })) ?? []),
  ];
  const loading = resource ? !data?.length || isPending : isLoading;

  const optionsWithAll = [
    allOption,
    ...(!!data?.length && !isPending ? resourceOptions : options),
  ];

  const selectedValue = optionsWithAll.find((option) => {
    const value =
      typeof currentValue === 'string' ? currentValue : currentValue?.value;

    return option.value === value;
  });

  const handleRenderInput = (params: AutocompleteRenderInputParams) => (
    <FormFieldSkeleton isLoading={loading} hideLabel>
      <TextField {...params} label={label} />
    </FormFieldSkeleton>
  );

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    newValue: SelectOption | null,
    reason?: string,
  ) => {
    const allOptionValue = allOption.value;

    if (reason === 'clear') {
      onChange(allOptionValue);
      setValue(allOptionValue);
      return;
    }

    const selectedValue = newValue?.value ?? null;
    setValue(selectedValue);

    if (onChange) {
      onChange(selectedValue);
    }
  };

  useEffect(() => {
    if (resource) {
      execute();
    }
  }, [filters]);

  return (
    <Autocomplete
      disabled={loading}
      isOptionEqualToValue={(option) => option.value === currentValue}
      onChange={handleChange}
      options={optionsWithAll}
      renderInput={handleRenderInput}
      value={selectedValue ?? allOption}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.value}>
            {option.label}
          </li>
        );
      }}
      sx={{
        '& .MuiInputLabel-root': {
          pr: '16px',
        },
      }}
      {...rest}
    />
  );
};

export default AutocompleteField;
