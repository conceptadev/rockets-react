import React from 'react';
import Select from '../../components/Select';
import { WidgetProps } from '@rjsf/utils';

const CustomSelectWidget = ({
  id,
  options,
  label,
  required,
  disabled,
  readonly,
  value,
  multiple,
  onChange,
  rawErrors = [],
}: WidgetProps) => {
  const { enumOptions, enumDisabled } = options;

  const emptyValue = multiple ? [] : '';

  const _onChange = ({
    target: { value },
  }: React.ChangeEvent<{ name?: string; value: unknown }>) => onChange(value);

  const selectOptions = () =>
    enumOptions?.map(({ value, label }) => {
      const disabled = enumDisabled && enumDisabled.indexOf(value) != -1;

      return { value, label, disabled };
    });

  return (
    <Select
      id={id}
      label={label}
      value={typeof value === 'undefined' ? emptyValue : value}
      options={selectOptions()}
      onChange={_onChange}
      required={required}
      disabled={disabled || readonly}
      error={rawErrors.length > 0}
    />
  );
};

export default CustomSelectWidget;
