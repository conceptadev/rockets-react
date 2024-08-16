import React, { SyntheticEvent, useEffect, useMemo } from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import {
  ariaDescribedByIds,
  labelValue,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import { Autocomplete, createFilterOptions } from '@mui/material';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import { FormFieldSkeleton } from '../../components/FormFieldSkeleton';
import { allOption } from '../../components/SelectField/SelectField';
import { TextField } from '../../components/TextField';

type Option = {
  value: string;
  label: string;
};

/**
 * Maps the provided option(s) to their corresponding value(s) based on the specified criteria.
 *
 * @param value - The option(s) to be mapped. Can be a single Option or an array of Options.
 * @param optEmptyVal - The value to return if the provided 'value' is falsy (undefined, null, etc.).
 * @param options - The available options of the Autocomplete.
 * @returns The mapped value(s) based on the provided 'value' and the specified criteria.
 */
const availableOptionsValueMap = (
  value: Option | Option[],
  optEmptyVal,
  options: Option[],
) => {
  if (!value) return optEmptyVal;

  if (Array.isArray(value)) {
    if (value.find((option) => option.value === allOption.value)) {
      return options.map((option) => option.value);
    }

    return value?.length < 1
      ? []
      : [...new Set(value.map((item) => item.value))];
  }

  return value?.value;
};

/** The `SelectWidget` is a widget for rendering dropdowns.
 *  It is typically used with string properties constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 * @returns A React JSX element representing the autocomplete.
 */
export default function CustomAutocompleteWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  schema,
  id,
  name, // remove this from textFieldProps
  options,
  label,
  hideLabel,
  required,
  disabled,
  placeholder,
  readonly,
  value,
  multiple,
  autofocus,
  onChange,
  onBlur,
  onFocus,
  rawErrors = [],
  size,
  registry,
  uiSchema,
  hideError,
  formContext,
  ...textFieldProps
}: WidgetProps<T, S, F>) {
  const { get } = useDataProvider();

  const { enumOptions } = options;

  const resource = uiSchema?.['ui:resource'];
  const resourceLabel = uiSchema?.['ui:resourceLabel'];
  const resourceValue = uiSchema?.['ui:resourceValue'];
  const queryParams = uiSchema?.['ui:queryParams'];
  const renderOption = uiSchema?.['ui:renderOption'];
  const selectAll = uiSchema?.['ui:selectAll'];
  const additionalOptions = uiSchema?.['ui:additionalOptions'];
  const uiMultiple = uiSchema?.['ui:multiple'];
  const limitTags = uiSchema?.['ui:limitTags'];

  const getResource = () => {
    return get({
      uri: `/${resource}`,
      queryParams,
    });
  };
  const { execute, data, isPending } = useQuery<unknown[]>(getResource, false);

  const resourceOptions = [
    ...(Array.isArray(additionalOptions) ? additionalOptions : []),
    ...(data?.map((resource) => ({
      value: resource[resourceValue ?? 'id'],
      label: resource[resourceLabel ?? 'name'],
    })) ?? []),
  ];

  const availableOptions: Option[] = resource ? resourceOptions : enumOptions;

  multiple = uiMultiple || (!!multiple && typeof multiple !== 'undefined');
  const emptyValue = multiple ? [] : undefined;
  const isEmpty =
    typeof value === 'undefined' ||
    (multiple && value.length < 1) ||
    (!multiple && value === emptyValue);

  const controlledValue = useMemo(() => {
    if (multiple) {
      return value?.map((optionValue) =>
        availableOptions?.find((option) => option.value === optionValue),
      );
    }

    return availableOptions?.find((option) => option.value === value);
  }, [availableOptions, value, multiple]);

  const _onChange = (_: SyntheticEvent<Element, Event>, newValue: Option) =>
    onChange(availableOptionsValueMap(newValue, emptyValue, availableOptions));

  useEffect(() => {
    if (resource) {
      execute();
    }
  }, [JSON.stringify(queryParams)]);

  return (
    <Autocomplete
      multiple={multiple}
      limitTags={limitTags}
      filterOptions={(options, params) => {
        const filter = createFilterOptions();
        const filtered = filter(options, params);

        if (selectAll) {
          filtered.unshift({ label: selectAll, value: allOption.value });
        }

        return filtered;
      }}
      renderOption={(props, option, state, ownerState) => {
        if (!renderOption) {
          return (
            <li {...props} key={option.key}>
              {option.label}
            </li>
          );
        }

        return renderOption(props, option, state, ownerState);
      }}
      options={availableOptions ?? []}
      isOptionEqualToValue={(option) => option.value === controlledValue}
      getOptionLabel={(option) => option?.label}
      size={size ?? 'small'}
      value={controlledValue}
      onChange={_onChange}
      renderInput={(params) => (
        <FormFieldSkeleton isLoading={isPending}>
          <TextField
            {...params}
            id={id}
            name={id}
            label={labelValue(label || undefined, hideLabel, false)}
            required={required}
            disabled={disabled || readonly}
            autoFocus={autofocus}
            placeholder={placeholder}
            error={rawErrors.length > 0}
            {...(textFieldProps as TextFieldProps)}
            InputLabelProps={{
              ...textFieldProps.InputLabelProps,
              shrink: !isEmpty,
            }}
            SelectProps={{
              ...textFieldProps.SelectProps,
              multiple,
            }}
            aria-describedby={ariaDescribedByIds<T>(id)}
          />
        </FormFieldSkeleton>
      )}
    />
  );
}
