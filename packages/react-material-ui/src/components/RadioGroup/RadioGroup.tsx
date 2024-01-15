import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio, { RadioProps } from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import Text from '../Text';
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
  textProps?: TextProps;
};

const Radio = (props: CustomRadioGroupProps & RadioGroupProps & RadioProps) => {
  const {
    id,
    name,
    options,
    label,
    required,
    row,
    value,
    onChange,
    disabled,
    textProps = {
      fontSize: 16,
      fontWeight: 400,
      color: 'text.primary',
    },
  } = props;

  return (
    <>
      {label && (
        <label htmlFor={name}>
          <Text {...textProps}>
            {label}
            {required && ' *'}
          </Text>
        </label>
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
    </>
  );
};

export default Radio;
