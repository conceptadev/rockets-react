import React, { FC } from 'react';
import MuiSwitch, { SwitchProps } from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

type Props = {
  label?: string;
};

const Switch: FC<Props & SwitchProps> = (props) => {
  const { label, disabled, checked, onChange } = props;

  return (
    <>
      {label ? (
        <FormGroup>
          <FormControlLabel
            disabled={disabled}
            control={<MuiSwitch onChange={onChange} />}
            label={label}
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
