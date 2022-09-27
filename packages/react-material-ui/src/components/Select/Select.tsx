import React, { FC } from 'react';
import Box from '../Box';
import MenuItem from '@mui/material/MenuItem';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export type SelectOptions = {
  label: string;
  value: unknown;
  disabled?: boolean;
};

type Props = {
  options: SelectOptions[];
};

const SelectWidget: FC<Props & TextFieldProps> = (props) => {
  const { id, label, value, options, onChange, required, disabled, error } =
    props;

  return (
    <>
      {label && (
        <Box>
          {label}
          {required && ' *'}
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
        {options.map(({ value, label }: any, i: number) => {
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

export default SelectWidget;
