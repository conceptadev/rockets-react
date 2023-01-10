import React, { FC } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio, { RadioProps } from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';

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
};

const Radio: FC<CustomRadioGroupProps & RadioGroupProps & RadioProps> = (
  props,
) => {
  const { id, options, label, required, row, value, onChange, disabled } =
    props;

  return (
    <>
      {label && (
        <>
          {label}
          {required && ' *'}
        </>
      )}
      <RadioGroup id={id} value={`${value}`} row={row} onChange={onChange}>
        {options.map((option: RadioOptions, i: number) => {
          const radio = (
            <FormControlLabel
              control={<MuiRadio name={`${id}-${i}`} color="primary" key={i} />}
              label={`${option.label}`}
              value={`${option.value}`}
              key={i}
              disabled={disabled || option.disabled}
            />
          );

          return radio;
        })}
      </RadioGroup>
    </>
  );
};

export default Radio;
