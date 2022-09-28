import { WidgetProps } from '@rjsf/core';

export const filterProps = (props: WidgetProps) => ({
  id: props.id,
  value: props.value,
  required: props.required,
  disabled: props.disabled,
  readonly: props.readonly,
  autofocus: props.autofocus,
  placeholder: props.placeholder,
  onChange: props.onChange,
  label: props.label,
  maxLength: props.maxLength,
  type: props.type,
});
