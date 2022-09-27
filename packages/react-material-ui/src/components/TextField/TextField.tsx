import React, { FC } from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import Text from '../Text';

const TextField: FC<TextFieldProps> = (props) => {
  const { label, required, sx } = props;
  return (
    <>
      <Text
        fontSize={14}
        fontWeight={500}
        color="text.primary"
        textAlign="left"
      >
        {label}
        {required && ' *'}
      </Text>
      <MuiTextField
        {...props}
        sx={{
          ...sx,
          marginTop: '4px',
          mb: 3,
          input: { color: 'text.primary' },
        }}
        size="small"
        hiddenLabel
        label=""
      />
    </>
  );
};

export default TextField;
