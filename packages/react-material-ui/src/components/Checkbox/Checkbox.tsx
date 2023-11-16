import React, { FC } from 'react';
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Text from '../Text';
import { TextProps } from 'interfaces';

type Props = {
  label?: string;
  textProps?: TextProps;
};

const Checkbox: FC<CheckboxProps & Props> = (props) => {
  const {
    label,
    checked,
    required,
    textProps = {
      fontSize: 16,
      fontWeight: 400,
      color: 'text.primary',
    },
  } = props;

  return (
    <>
      {label ? (
        <FormGroup>
          <FormControlLabel
            control={<MuiCheckbox onChange={props.onChange} />}
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
        <MuiCheckbox {...props} sx={{ ...props.sx }} />
      )}
    </>
  );
};

export default Checkbox;
