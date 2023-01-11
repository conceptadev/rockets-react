import React, { FC } from 'react';
import MuiSwitch, { SwitchProps } from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TypographyProps } from '@mui/material/Typography';
import Text from '../Text';

type Props = {
  label?: string;
  fontFamily?: TypographyProps['fontFamily'];
};

const Switch: FC<Props & SwitchProps> = (props) => {
  const { label, disabled, checked, onChange, required, fontFamily } = props;

  return (
    <>
      {label ? (
        <FormGroup>
          <FormControlLabel
            disabled={disabled}
            control={<MuiSwitch onChange={onChange} />}
            label={
              <Text
                fontWeight={400}
                color="text.primary"
                fontFamily={fontFamily}
              >
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
