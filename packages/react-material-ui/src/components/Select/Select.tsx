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
    size,
    value,
    options,
    onChange,
    required,
    disabled,
    error,
    helperText,
    name,
    textProps = {
      fontSize: 14,
      fontWeight: 500,
      color: 'text.primary',
    },
    // ...otherProps
  } = props;

  // eslint-disable-next-line no-console
  console.log('props', props);

  const labelId = `label-${name}`;
  return (
    <>
      {label && (
        <Box>
          <label htmlFor={name} id={labelId}>
            <Text {...textProps}>
              {label}
              {required && ' *'}
            </Text>
          </label>
        </Box>
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
    </>
  );
};

export default Select;
