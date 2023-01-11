import React, { FC } from 'react';
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TypographyProps } from '@mui/material/Typography';
import Text from '../Text';

type Props = {
  label?: string;
  fontFamily?: TypographyProps['fontFamily'];
};

const Checkbox: FC<CheckboxProps & Props> = (props) => {
  const { label, checked, fontFamily, required } = props;

  return (
    <>
      {label ? (
        <FormGroup>
          <FormControlLabel
            control={<MuiCheckbox onChange={props.onChange} />}
            label={
              <Text
                fontSize={16}
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
        <MuiCheckbox {...props} sx={{ ...props.sx }} />
      )}
    </>
  );
};

export default Checkbox;
