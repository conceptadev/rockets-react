import React, { FC } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Text from '../Text';
import { TextProps } from 'interfaces';

export type SelectOptions = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

type Props = {
  options: SelectOptions[];
  textProps?: TextProps;
};

const Select: FC<Props & TextFieldProps> = (props) => {
  const {
    id,
    label,
    value,
    options,
    onChange,
    required,
    disabled,
    error,
    textProps = {
      fontSize: 16,
      fontWeight: 400,
      color: 'text.primary',
    },
  } = props;

  return (
    <>
      {label && (
        <Box>
          <Text {...textProps}>
            {label}
            {required && ' *'}
          </Text>
        </Box>
      )}

      <TextField
        id={id}
        select
        value={value}
        disabled={disabled}
        error={error}
        onChange={onChange}
        sx={{ width: '100%' }}
      >
        {options.map(({ value, label }: SelectOptions, i: number) => {
          return (
            <MenuItem key={i} value={value} disabled={disabled}>
              {label}
            </MenuItem>
          );
        })}
      </TextField>
    </>
  );
};

export default Select;
