import React from 'react';
import {
  Box,
  BoxProps,
  FormControl,
  FormLabel,
  MenuItem,
  TextField,
  TextFieldProps,
} from '@mui/material';
import Text from '../Text';
import { TextProps } from 'interfaces';

const TEXT_INITIAL_PROPS = {
  fontSize: 14,
  fontWeight: 500,
  color: 'text.primary',
};

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
      <FormControl>
        {label && (
          <FormLabel htmlFor={name}>
            <Text textAlign="left" {...TEXT_INITIAL_PROPS} {...labelProps}>
              {`${label}${required ? ' *' : ''}`}
            </Text>
          </FormLabel>
        )}

        <TextField
          id={id}
          select
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
