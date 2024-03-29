import React from 'react';
import {
  Box,
  BoxProps,
  FormControl,
  MenuItem,
  TextField,
  TextFieldProps,
} from '@mui/material';
import FormLabel from '../FormLabel';
import { TextProps } from 'interfaces';

export type SelectOptions = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

type Props = {
  containerProps?: BoxProps;
  labelProps?: TextProps;
  options: SelectOptions[];
};

const Select = (props: Props & TextFieldProps) => {
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

export default Select;
