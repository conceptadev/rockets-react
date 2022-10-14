import React, { FC } from 'react';
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

type Props = {
  label?: string;
};

const Checkbox: FC<CheckboxProps & Props> = (props) => {
  const { label, checked } = props;
  return (
    <>
      {label ? (
        <FormGroup>
          <FormControlLabel
            control={<MuiCheckbox onChange={props.onChange} />}
            label={label}
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
