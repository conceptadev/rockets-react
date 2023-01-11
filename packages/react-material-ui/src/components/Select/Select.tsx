import React, { FC } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { TypographyProps } from '@mui/material/Typography';
import Text from '../Text';

export type SelectOptions = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

type Props = {
  options: SelectOptions[];
  fontFamily?: TypographyProps['fontFamily'];
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
    fontFamily,
  } = props;

  return (
    <>
      {label && (
        <Box>
          <Text fontWeight={400} color="text.primary" fontFamily={fontFamily}>
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
