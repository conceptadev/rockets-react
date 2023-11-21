import React, { FocusEvent, SyntheticEvent, useEffect } from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import {
  ariaDescribedByIds,
  enumOptionsValueForIndex,
  labelValue,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import { Autocomplete } from '@mui/material';
import TextField from '../../components/TextField';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import FormFieldSkeleton from '../../components/FormFieldSkeleton';

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

  const { enumOptions, enumDisabled, emptyValue: optEmptyVal } = options;

  const resource = uiSchema?.['ui:resource'];
  const resourceLabel = uiSchema?.['ui:resourceLabel'];
  const resourceValue = uiSchema?.['ui:resourceValue'];

  multiple = typeof multiple === 'undefined' ? false : !!multiple;

  const getResource = () => {
    return get({
      uri: `/${resource}`,
    });
  };

  const { execute, data, isPending } = useQuery(getResource, false);

  const resourceOptions = data?.map((resource) => ({
    value: resource[resourceValue ?? 'id'],
    label: resource[resourceLabel ?? 'name'],
  }));

  const availableOptions = resource ? resourceOptions : enumOptions;

  const controlledValue = availableOptions?.find(
    (option) => option.value === value,
  );

  const emptyValue = multiple ? [] : '';
  const isEmpty =
    typeof value === 'undefined' ||
    (multiple && value.length < 1) ||
    (!multiple && value === emptyValue);

  const _onChange = (
    _: SyntheticEvent<Element, Event>,
    newValue: { value: string; label: string },
  ) => {
    if (!newValue) return onChange(optEmptyVal);

    onChange(newValue?.value);
  };
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(
      id,
      enumOptionsValueForIndex<S>(value, availableOptions, optEmptyVal),
    );
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(
      id,
      enumOptionsValueForIndex<S>(value, availableOptions, optEmptyVal),
    );

  // TODO: Implement multiple select
  /* const selectedIndexes = enumOptionsIndexForValue<S>(
    value,
    availableOptions,
    multiple,
  ); */

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
      key={controlledValue}
      options={availableOptions ?? []}
      isOptionEqualToValue={(option) => option.value === controlledValue}
      getOptionLabel={(option) => option.label}
      size={size ?? 'small'}
      value={controlledValue}
      onChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
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
