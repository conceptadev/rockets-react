import React, { FC, useState } from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Text from '../Text';

interface TextAreaProps {
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  hiddenLabel?: boolean;
}

const TextField: FC<TextFieldProps & { options?: TextAreaProps }> = (props) => {
  const { label, required, sx, type, size, options } = props;

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prv) => !prv);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const isPassword = type === 'password';

  return (
    <>
      {!options?.hiddenLabel && label && (
        <Text
          fontSize={14}
          fontWeight={500}
          color="text.primary"
          textAlign="left"
        >
          {label}
          {required && ' *'}
        </Text>
      )}
      <MuiTextField
        {...props}
        sx={{
          ...sx,
          marginTop: '4px',
          mb: 3,
          input: { color: 'text.primary' },
        }}
        size={size || 'small'}
        hiddenLabel={label ? true : options?.hiddenLabel}
        label={options?.hiddenLabel ? '' : props.label}
        type={isPassword ? (showPassword ? 'text' : 'password') : type}
        InputProps={{
          ...(isPassword && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }),
        }}
      />
    </>
  );
};

export default TextField;
