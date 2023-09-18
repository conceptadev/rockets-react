import React, { FC, ChangeEvent } from 'react';
import Select from '../../components/Select';
// import { processSelectValue, WidgetProps } from '@rjsf/utils';
// import { WidgetProps } from '@rjsf/utils';
import {
  ariaDescribedByIds,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  labelValue,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';

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
  const { enumOptions, enumDisabled, emptyValue: optEmptyVal } = options;

  const emptyValue = multiple ? [] : '';

  const _onChange = ({
    target: { value },
  }: React.ChangeEvent<{ name?: string; value: unknown }>) => onChange(value);

  const selectOptions = () =>
    (enumOptions as any)?.map(({ value, label }: any) => {
      const disabled: any =
        enumDisabled && (enumDisabled as any).indexOf(value) != -1;

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
