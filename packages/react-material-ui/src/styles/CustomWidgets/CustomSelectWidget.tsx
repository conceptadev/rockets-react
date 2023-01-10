import React, { FC } from 'react';
import Select from '../../components/Select';
import { processSelectValue, WidgetProps } from '@rjsf/utils';

const CustomSelectWidget: FC<WidgetProps> = ({
  schema,
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
}) => {
  const { enumOptions, enumDisabled } = options;

  const emptyValue = multiple ? [] : '';

  const _onChange = ({
    target: { value },
  }: React.ChangeEvent<{ name?: string; value: unknown }>) =>
    onChange(processSelectValue(schema, value, options));

  const selectOptions = () =>
    (enumOptions as any)?.map(({ value, label }: any) => {
      const disabled: any =
        enumDisabled && (enumDisabled as any).indexOf(value) != -1;

      return { value, label, disabled };
    });

  return (
    <Select
      id={id}
      label={label || schema.title}
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
