import React, { FC, useState } from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Text from '../Text';
import { TextProps } from '../../interfaces';

interface TextAreaProps {
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  hiddenLabel?: boolean;
}

interface Props {
  textProps?: TextProps;
  options?: TextAreaProps;
}

const TextField: FC<TextFieldProps & Props> = (props) => {
  const {
    label,
    required,
    sx,
    type,
    size,
    hiddenLabel,
    options,
    textProps = {
      fontSize: 14,
      fontWeight: 500,
      color: 'text.primary',
    },
  } = props;

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

  const ishiddenLabel = hiddenLabel || options?.hiddenLabel;

  return (
    <>
      {!ishiddenLabel && label && (
        <Text textProps={textProps} textAlign="left">
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
        hiddenLabel={label ? true : ishiddenLabel}
        label={''}
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
