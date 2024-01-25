import React from 'react';
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Text from '../Text';
import { TextProps } from 'interfaces';

type Props = {
  label?: string;
  textProps?: TextProps;
};

const Checkbox = (props: CheckboxProps & Props) => {
  const {
    label,
    checked,
    required,
    textProps = {
      fontSize: 16,
      fontWeight: 400,
      color: 'text.primary',
    },
    ...otherProps
  } = props;

  return (
    <>
      {label ? (
        <FormGroup>
          <FormControlLabel
            control={<MuiCheckbox {...otherProps} />}
            label={
              <Text role="label" {...textProps}>
                {label}
                {required && ' *'}
              </Text>
            }
            checked={checked}
          />
        </FormGroup>
      ) : (
        <MuiCheckbox checked={checked} required={required} {...otherProps} />
      )}
    </>
  );
};

export default Checkbox;
