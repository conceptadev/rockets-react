import React from 'react';
import {
  Box,
  BoxProps,
  FormControl,
  MenuItem,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { FormLabel } from '../FormLabel';
import { TextProps } from 'interfaces';

/**
 * Option type for the Select component.
 */
export type SelectOptions = {
  /** Display label for the option */
  label: string;
  /** Value associated with the option */
  value: string | number;
  /** Whether the option is disabled */
  disabled?: boolean;
};

/**
 * Props for the Select component.
 */
export type SelectProps = TextFieldProps & {
  /** Props for the container `Box` element */
  containerProps?: BoxProps;
  /** Props for the label component */
  labelProps?: TextProps;
  /** Array of selectable options */
  options: SelectOptions[];
};

/**
 * The Select component is a custom dropdown that leverages Material-UI's
 * `TextField` component with a `select` prop, allowing for a selection
 * from a list of options. It supports custom labels, error handling,
 * and can be styled using additional props for the container and label.
 * It's props extend from [Material UI's TextField](https://mui.com/material-ui/api/text-field/#props) component props, so every
 * prop is interchangeable between those two.
 *
 * @see [Storybook - Select](https://storybook.rockets.tools/?path=/docs/select)
 *
 * @example
 * ```tsx
 * <Select
 *   id="example-select"
 *   label="Choose an option"
 *   value={selectedValue}
 *   onChange={handleChange}
 *   options={[
 *     { label: 'Option 1', value: 1 },
 *     { label: 'Option 2', value: 2, disabled: true },
 *     { label: 'Option 3', value: 3 }
 *   ]}
 *   containerProps={{ mt: 2 }}
 *   labelProps={{ variant: 'h6' }}
 * />
 * ```
 *
 * @param props - Select component props
 */
export const Select = (props: SelectProps) => {
  const {
    id,
    label,
    size,
    value,
    containerProps,
    labelProps,
    options,
    onChange,
    required,
    disabled,
    error,
    helperText,
    name,
  } = props;

  const labelId = `label-${name}`;
  return (
    <Box {...containerProps}>
      <FormControl fullWidth>
        {label && typeof label === 'string' ? (
          <FormLabel
            id={labelId}
            name={name}
            label={label}
            required={required}
            labelProps={labelProps}
          />
        ) : (
          label
        )}

        <TextField
          id={id}
          select
          name={name}
          value={value}
          disabled={disabled}
          size={size || 'small'}
          error={error}
          helperText={helperText}
          onChange={onChange}
          sx={{
            marginTop: 0.5,
            width: '100%',
          }}
          hiddenLabel={true}
          label={''}
          aria-labelledby={labelId}
          data-testid="select"
        >
          {options.map(({ value, label }: SelectOptions, i: number) => {
            return (
              <MenuItem key={i} value={value} disabled={disabled}>
                {label}
              </MenuItem>
            );
          })}
        </TextField>
      </FormControl>
    </Box>
  );
};
