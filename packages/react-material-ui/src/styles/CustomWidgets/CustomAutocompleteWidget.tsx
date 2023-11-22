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
import { Autocomplete } from '@mui/material';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import FormFieldSkeleton from '../../components/FormFieldSkeleton';
import TextField from '../../components/TextField';

type Option = {
  value: string;
  label: string;
};

/**
 * Maps the provided option(s) to their corresponding value(s) based on the specified criteria.
 *
 * @param value - The option(s) to be mapped. Can be a single Option or an array of Options.
 * @param optEmptyVal - The value to return if the provided 'value' is falsy (undefined, null, etc.).
 * @returns The mapped value(s) based on the provided 'value' and the specified criteria.
 */
const availableOptionsValueMap = (value: Option | Option[], optEmptyVal) => {
  if (!value) return optEmptyVal;

  if (Array.isArray(value)) {
    return value?.length < 1 ? [] : value.map((item) => item.value);
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

  const getResource = () => {
    return get({
      uri: `/${resource}`,
    });
  };
  const { execute, data, isPending } = useQuery(getResource, false);

  const resourceOptions: Option[] = data?.map((resource) => ({
    value: resource[resourceValue ?? 'id'],
    label: resource[resourceLabel ?? 'name'],
  }));

  const availableOptions: Option[] = resource ? resourceOptions : enumOptions;

  multiple = typeof multiple === 'undefined' ? false : !!multiple;

  const emptyValue = multiple ? [] : undefined;

  const isEmpty =
    typeof value === 'undefined' ||
    (multiple && value.length < 1) ||
    (!multiple && value === emptyValue);

  const controlledValue = useMemo(() => {
    if (multiple) {
      return value.map((optionValue) =>
        availableOptions?.find((option) => option.value === optionValue),
      );
    }

    return availableOptions?.find((option) => option.value === value);
  }, [availableOptions, value, multiple]);

  const _onChange = (_: SyntheticEvent<Element, Event>, newValue: Option) =>
    onChange(availableOptionsValueMap(newValue, emptyValue));

  useEffect(() => {
    if (resource) {
      execute();
    }
  }, []);

  // TODO: This has to be done in a more generic way
  // e.g. BaseInputTemplate
  if (isPending) {
    return <FormFieldSkeleton />;
  }

  return (
    <Autocomplete
      multiple={multiple}
      key={controlledValue}
      options={availableOptions ?? []}
      isOptionEqualToValue={(option) => option.value === controlledValue}
      getOptionLabel={(option) => option.label}
      size={size ?? 'small'}
      value={controlledValue}
      onChange={_onChange}
      renderInput={(params) => (
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
      )}
    />
  );
}
