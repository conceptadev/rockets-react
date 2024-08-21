import React from 'react';
import {
  Box,
  BoxProps,
  FormControl,
  FormControlLabel,
  Radio as MuiRadio,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
} from '@mui/material';
import { FormLabel } from '../FormLabel';
import { TextProps } from 'interfaces';

/**
 * Represents an individual radio option in the `RadioGroup`.
 */
export type RadioOptions = {
  /** Label displayed next to the radio button */
  label: string;
  /** Value associated with the radio button */
  value: unknown;
  /** Whether the radio option is disabled */
  disabled?: boolean;
};

/**
 * Props for customizing the `RadioGroup` component.
 */
export type RadioGroupProps = MuiRadioGroupProps & {
  /** Array of radio options to display */
  options: RadioOptions[];
  /** Label for the radio group */
  label?: string;
  /** Marks the radio group as required */
  required?: boolean;
  /** Displays radio buttons in a row if set to true */
  row?: boolean;
  /** Disables all radio buttons in the group if set to true */
  disabled?: boolean;
  /** Props to customize the container `Box` component */
  containerProps?: BoxProps;
  /** Props to customize the `FormLabel` component */
  labelProps?: TextProps;
};

/**
 * The `Radio` component renders a group of radio buttons with various configuration
 * options, including labels, custom styles, and disabled states. It utilizes Material-UI components
 * for structure and styling.
 *
 *  @see [Storybook - RadioGroup](https://storybook.rockets.tools/?path=/docs/radiogroup)
 *
 * @example
 * ```tsx
 * <Radio
 *   id="example-radio-group"
 *   name="exampleRadios"
 *   label="Select an option"
 *   required={true}
 *   row={true}
 *   value="2"
 *   options={[
 *     { label: 'Option 1', value: '1' },
 *     { label: 'Option 2', value: '2' },
 *     { label: 'Option 3', value: '3', disabled: true },
 *   ]}
 *   onChange={(e) => console.log(e.target.value)}
 * />
 * ```
 *
 * @param props - Props for the `RadioGroup` component
 */
export const RadioGroup = (props: RadioGroupProps) => {
  const {
    id,
    name,
    containerProps,
    labelProps,
    options,
    label,
    required,
    row,
    value,
    onChange,
    disabled,
  } = props;

  return (
    <Box {...containerProps}>
      <FormControl>
        {label && (
          <FormLabel
            name={name}
            label={label}
            required={required}
            labelProps={labelProps}
          />
        )}
        <MuiRadioGroup id={id} value={`${value}`} row={row} onChange={onChange}>
          {options.map((option: RadioOptions, i: number) => (
            <FormControlLabel
              control={<MuiRadio name={`${id}-${i}`} color="primary" key={i} />}
              label={`${option.label}`}
              value={`${option.value}`}
              key={i}
              disabled={disabled || option.disabled}
            />
          ))}
        </MuiRadioGroup>
      </FormControl>
    </Box>
  );
};
