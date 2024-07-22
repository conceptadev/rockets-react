import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio, { RadioProps } from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import FormLabel from '../FormLabel';
import { TextProps } from 'interfaces';

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
          <FormLabel
            name={name}
            label={label}
            required={required}
            labelProps={labelProps}
          />
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
