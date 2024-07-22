import React from 'react';
import MuiFormLabel from '@mui/material/FormLabel';
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
    <MuiFormLabel
      id={id}
      htmlFor={name}
      sx={{
        width: '100%',
      }}
    >
      <Text textAlign="left" {...TEXT_INITIAL_PROPS} {...labelProps}>
        {label && `${label}${required ? ' *' : ''}`}
      </Text>
    </MuiFormLabel>
  );
};

export default FormLabel;
