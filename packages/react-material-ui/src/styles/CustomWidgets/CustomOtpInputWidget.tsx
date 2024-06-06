import React, { FocusEvent } from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import {
  ariaDescribedByIds,
  BaseInputTemplateProps,
  examplesId,
  getInputProps,
  labelValue,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import OtpInput from '../../components/OtpInput';

const TYPES_THAT_SHRINK_LABEL = ['date', 'datetime-local', 'file', 'time'];

/**
 * The `BaseInputTemplate` is the template to use to render the basic `<input>` component for the `core` theme.
 * It is used as the template for rendering many of the <input> based widgets that differ by `type` and callbacks only.
 * It can be customized/overridden for other themes or individual implementations as needed.
 *
 * @param props - The `WidgetProps` for this template
 * @returns - React component
 */
export default function CustomOtpInputWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: BaseInputTemplateProps<T, S, F>) {
  const {
    id,
    name, // remove this from textFieldProps
    placeholder,
    required,
    readonly,
    disabled,
    type,
    label,
    hideLabel,
    value,
    onChange,
    onChangeOverride,
    onBlur,
    onFocus,
    autofocus,
    options,
    schema,
    uiSchema,
    rawErrors = [],
    formContext,
    registry,
    InputLabelProps,
    ...textFieldProps
  } = props;
  const inputProps = getInputProps<T, S, F>(schema, type, options);
  // Now we need to pull out the step, min, max into an inner `inputProps` for material-ui
  const { step, min, max, ...rest } = inputProps;
  const otherProps = {
    inputProps: {
      step,
      min,
      max,
      ...(schema.examples ? { list: examplesId<T>(id) } : undefined),
    },
    ...rest,
  };

  const formatData = uiSchema?.['ui:formatter'];

  const _onChange = (value: any) => {
    onChange(
      value === ''
        ? options.emptyValue
        : formatData
        ? formatData(value)
        : value,
    );
  };
  const _onBlur = (value, isComplete) => onBlur(id, value);
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, value);
  const DisplayInputLabelProps = TYPES_THAT_SHRINK_LABEL.includes(type)
    ? {
        ...InputLabelProps,
        shrink: true,
      }
    : InputLabelProps;

  const _label = labelValue(label || undefined, hideLabel, false);

  return (
    <>
      <OtpInput
        id={id}
        name={id}
        placeholder={placeholder}
        autoFocus={autofocus}
        label={_label === false ? undefined : label}
        value={value}
        textFieldProps={{
          name: id,
          required: required,
          error: rawErrors.length > 0,
          disabled: disabled || readonly,
          InputLabelProps: DisplayInputLabelProps,
          ...otherProps,
          ...(textFieldProps as TextFieldProps),
        }}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        aria-describedby={ariaDescribedByIds<T>(id, !!schema.examples)}
      />
      {Array.isArray(schema.examples) && (
        <datalist id={examplesId<T>(id)}>
          {(schema.examples as string[])
            .concat(
              schema.default && !schema.examples.includes(schema.default)
                ? ([schema.default] as string[])
                : [],
            )
            .map((example: any) => {
              return <option key={example} value={example} />;
            })}
        </datalist>
      )}
    </>
  );
}
