import React from 'react';
import { FormLabel as MuiFormLabel } from '@mui/material';
import Text from '../Text';
import { TextProps } from 'interfaces';

const TEXT_INITIAL_PROPS = {
  fontSize: 14,
  fontWeight: 500,
  color: 'text.primary',
};

type Props = {
  id?: string;
  name?: string;
  label?: string;
  required?: boolean;
  labelProps?: TextProps;
};

const FormLabel = (props: Props) => {
  const { id, name, labelProps, label, required } = props;

  return (
    <MuiFormLabel id={id} htmlFor={name}>
      <Text textAlign="left" {...TEXT_INITIAL_PROPS} {...labelProps}>
        {`${label}${required ? ' *' : ''}`}
      </Text>
    </MuiFormLabel>
  );
};

export default FormLabel;
