import React from 'react';
import {
  Box,
  BoxProps,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio as MuiRadio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
} from '@mui/material';
import Text from '../Text';
import { TextProps } from 'interfaces';

const TEXT_INITIAL_PROPS = {
  fontSize: 14,
  fontWeight: 500,
  color: 'text.primary',
};

export type RadioOptions = {
  label: string;
  value: unknown;
  disabled?: boolean;
};

type CustomRadioGroupProps = {
  options: RadioOptions[];
  label?: string;
  required?: boolean;
  row?: boolean;
  disabled?: boolean;
  containerProps?: BoxProps;
  labelProps?: TextProps;
};

const Radio = (props: CustomRadioGroupProps & RadioGroupProps & RadioProps) => {
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
          <FormLabel htmlFor={name}>
            <Text textAlign="left" {...TEXT_INITIAL_PROPS} {...labelProps}>
              {`${label}${required ? ' *' : ''}`}
            </Text>
          </FormLabel>
        )}
        <RadioGroup id={id} value={`${value}`} row={row} onChange={onChange}>
          {options.map((option: RadioOptions, i: number) => (
            <FormControlLabel
              control={<MuiRadio name={`${id}-${i}`} color="primary" key={i} />}
              label={`${option.label}`}
              value={`${option.value}`}
              key={i}
              disabled={disabled || option.disabled}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default Radio;
