import { WidgetProps } from '@rjsf/utils';

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
  hiddenLabel: props.hiddenLabel,
  maxLength: props.maxLength,
  type: props.type,
});
