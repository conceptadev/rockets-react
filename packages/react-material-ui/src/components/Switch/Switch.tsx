import React, { FC } from 'react';
import MuiSwitch, { SwitchProps } from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Text from '../Text';
import { TextProps } from 'interfaces';

type Props = {
  label?: string;
  textProps?: TextProps;
};

const Switch: FC<Props & SwitchProps> = (props) => {
  const {
    label,
    disabled,
    checked,
    onChange,
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
            disabled={disabled}
            control={<MuiSwitch onChange={onChange} />}
            label={
              <Text {...textProps}>
                {label}
                {required && ' *'}
              </Text>
            }
            checked={checked}
          />
        </FormGroup>
      ) : (
        <MuiSwitch {...props} />
      )}
    </>
  );
};

export default Switch;
