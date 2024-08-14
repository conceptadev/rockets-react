import React from 'react';
import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Text from '../Text';
import { TextProps } from 'interfaces';

/**
 * Checkbox component props.
 */
export type CheckboxProps = MuiCheckboxProps & {
  /** Label text associated with the checkbox */
  label?: string;
  /**
   * Custom styles for the label text. This prop is passed down to the `Text` component.
   */
  textProps?: TextProps;
};

/**
 * The Checkbox component is a UI element that renders a Material-UI Checkbox
 * with optional label and customizable label styling. It supports all standard
 * checkbox properties along with additional features like label customization.
 * It's props extend from [Material UI's Checkbox](https://mui.com/material-ui/api/checkbox/#props) component props, so every
 * prop is interchangeable between those two.
 *
 * @see [Storybook - Checkbox](https://storybook.rockets.tools/?path=/docs/checkbox)
 *
 * @example
 * ```tsx
 * <Checkbox
 *   label="Accept Terms"
 *   checked={true}
 *   required={true}
 *   textProps={{
 *     fontSize: 14,
 *     fontWeight: 500,
 *     color: 'text.secondary'
 *   }}
 * />
 * ```
 *
 * @param CheckboxProps - Checkbox component props
 * @param MuiCheckboxProps - MUI {@link [MuiCheckboxProps](https://mui.com/material-ui/api/checkbox/#props)}
 */
export const Checkbox = (props: CheckboxProps) => {
  const {
    label,
    checked,
    required,
    textProps = {
      fontSize: 16,
      fontWeight: 400,
      color: 'text.primary',
    },
    ...otherProps
  } = props;

  return (
    <>
      {label ? (
        <FormGroup>
          <FormControlLabel
            control={<MuiCheckbox {...otherProps} />}
            label={
              <Text role="label" {...textProps}>
                {label}
                {required && ' *'}
              </Text>
            }
            checked={checked}
          />
        </FormGroup>
      ) : (
        <MuiCheckbox checked={checked} required={required} {...otherProps} />
      )}
    </>
  );
};
