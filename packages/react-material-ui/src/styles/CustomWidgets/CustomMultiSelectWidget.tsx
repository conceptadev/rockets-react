import React, { useEffect } from 'react';
import { MultiSelect } from '../../components/MultiSelect';

import {
  enumOptionsIndexForValue,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';

function CustomMultiSelectWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    options,
    label,
    required,
    disabled,
    readonly,
    value,
    onChange,
    rawErrors = [],
  } = props;
  const { enumOptions, enumDisabled, displayVariant, placeholder } = options;

  const _onChange = (value: string[]) => onChange(value);

  useEffect(() => {
    if (value?.length && value.filter((val: string) => val).length === 0) {
      onChange([]);
    }
  }, []);

  const selectOptions = () =>
    (enumOptions || [])?.map(({ value, label }) => {
      const disabled = enumDisabled && enumDisabled.indexOf(value) != -1;

      return { value, label, disabled };
    });

  const selectedIndexes = enumOptionsIndexForValue<S>(value, enumOptions, true);

  const _value =
    !selectedIndexes?.length || typeof value === 'undefined' ? [] : value;

  return (
    <MultiSelect
      id={id}
      label={label}
      value={_value}
      options={selectOptions()}
      onChange={_onChange}
      required={required}
      disabled={disabled || readonly}
      error={rawErrors.length > 0}
      hasAllOption={false}
      displayVariant={displayVariant === 'chips' ? 'chips' : 'default'}
      labelVariant="rockets"
      placeholder={placeholder}
      size="small"
      sx={{
        marginTop: 0.5,
        width: '100%',
      }}
    />
  );
}

export default CustomMultiSelectWidget;
