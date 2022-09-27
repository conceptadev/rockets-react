import React, { FC } from 'react';
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

type Props = {
  label?: string;
};

const Checkbox: FC<CheckboxProps & Props> = (props) => {
  const { label } = props;
  return (
    <>
      {label ? (
        <FormGroup>
          <FormControlLabel
            control={<MuiCheckbox onChange={props.onChange} />}
            label={props.label}
            value={props.value}
          />
        </FormGroup>
      ) : (
        <MuiCheckbox {...props} sx={{ ...props.sx }} />
      )}
    </>
  );
};

export default Checkbox;
