import React, { FC } from 'react';
import MuiSwitch, { SwitchProps } from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TypographyProps } from '@mui/material/Typography';
import Text from '../Text';

type Props = {
  label?: string;
  fontFamily?: TypographyProps['fontFamily'];
  fontSize?: TypographyProps['fontSize'];
  fontWeight?: TypographyProps['fontWeight'];
  color?: TypographyProps['color'];
};

const Switch: FC<Props & SwitchProps> = (props) => {
  const {
    label,
    disabled,
    checked,
    onChange,
    required,
    fontFamily,
    fontSize = 16,
    fontWeight = 400,
    color = 'text.primary',
  } = props;

  return (
    <>
      {label ? (
        <FormGroup>
          <FormControlLabel
            disabled={disabled}
            control={<MuiSwitch onChange={onChange} />}
            label={
              <Text
                fontFamily={fontFamily}
                fontSize={fontSize}
                fontWeight={fontWeight}
                color={color}
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
