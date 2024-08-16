import React from 'react';
import MuiSwitch, { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Text from '../Text';
import { TextProps } from 'interfaces';

/**
 * Props for the `Switch` component.
 */
export type SwitchProps = MuiSwitchProps & {
  /**
   * The label text displayed alongside the switch.
   */
  label?: string;

  /**
   * Custom styles for the label text. This prop is passed down to the `Text` component.
   */
  textProps?: TextProps;
};

/**
 * The `Switch` component is a UI element used to toggle between two states,
 * typically representing "on" and "off". It supports features such as labeling,
 * custom label styling, and controlled or uncontrolled state management.
 * It's props extend from [Material UI's Switch](https://mui.com/material-ui/api/switch/#props) component props, so every
 * prop is interchangeable between those two.
 *
 * @see [Storybook - Switch](https://storybook.rockets.tools/?path=/docs/switch)
 *
 * @example
 * ```tsx
 * <Switch
 *   label="Enable Notifications"
 *   checked={true}
 *   onChange={(e) => console.log(e.target.checked)}
 *   textProps={{ fontSize: 14, color: 'primary.main' }}
 * />
 * ```
 *
 * @param SwitchProps - The props for the `Switch` component.
 * @param MuiSwitchProps - MUI {@link [MuiSwitchProps](https://mui.com/material-ui/api/switch/#props)}
 */

export const Switch = (props: SwitchProps) => {
  const {
    label,
    disabled,
    checked,
    onChange,
    required,
    textProps = {
      fontSize: 16,
      fontWeight: 400,
      color: 'text.primary',
    },
  } = props;

  return (
    <>
      {label ? (
        <FormGroup>
          <FormControlLabel
            disabled={disabled}
            control={<MuiSwitch onChange={onChange} />}
            label={
              <Text {...textProps}>
                {label}
                {required && ' *'}
              </Text>
            }
            checked={checked}
          />
        </FormGroup>
      ) : (
        <MuiSwitch {...props} />
      )}
    </>
  );
};
