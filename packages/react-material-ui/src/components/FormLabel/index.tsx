import React from 'react';
import { FormLabel as MuiFormLabel } from '@mui/material';
import Text from '../Text';
import { TextProps } from 'interfaces';

const TEXT_INITIAL_PROPS = {
  fontSize: 14,
  fontWeight: 500,
  color: 'text.primary',
};

/**
 * FormLabel component props.
 */
export type FormLabelProps = {
  /** Unique identifier for the label element */
  id?: string;
  /** Name attribute for the associated input element */
  name?: string;
  /** The text to display as the form label */
  label?: string;
  /** Whether the associated field is required, appends an asterisk to the label if true */
  required?: boolean;
  /** Additional properties to pass to the `Text` component used for rendering the label */
  labelProps?: TextProps;
};

/**
 * The FormLabel component is used to render a label for form elements.
 * It connects the label to the form element using the `htmlFor` attribute.
 *
 * @see [Storybook - FormLabel](https://storybook.rockets.tools/?path=/docs/formlabel)
 *
 * @example
 * ```tsx
 * <FormLabel
 *   id="username-label"
 *   name="username"
 *   label="Username"
 *   required={true}
 *   labelProps={{ color: 'primary.main', fontSize: 16 }}
 * />
 * ```
 *
 * @param FormLabelProps - FormLabel component props
 */
export const FormLabel = (props: FormLabelProps) => {
  const { id, name, labelProps, label, required } = props;

  return (
    <MuiFormLabel
      id={id}
      htmlFor={name}
      sx={{
        width: '100%',
      }}
    >
      <Text textAlign="left" {...TEXT_INITIAL_PROPS} {...labelProps}>
        {label && `${label}${required ? ' *' : ''}`}
      </Text>
    </MuiFormLabel>
  );
};

export default FormLabel;
