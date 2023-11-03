import React, { FC, useState } from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Text from '../Text';
import { Box, BoxProps, TypographyProps } from '@mui/material';

interface TextAreaProps {
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  hiddenLabel?: boolean;
}

interface Props {
  containerProps?: BoxProps;
  labelProps?: TypographyProps;
  options?: TextAreaProps;
}

const TextField: FC<TextFieldProps & Props> = (props) => {
  const {
    label,
    required,
    sx,
    type,
    size,
    value,
    hiddenLabel,
    options,
    containerProps,
    labelProps,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const { sx: labelSx, ...restLabelProps } = labelProps;

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
    <Box {...containerProps}>
      {!ishiddenLabel && label && (
        <Text
          sx={[
            {
              fontSize: 14,
              fontWeight: 500,
              color: 'text.primary',
            },
            ...(Array.isArray(labelSx) ? labelSx : [labelSx]),
          ]}
          textAlign="left"
          {...restLabelProps}
        >
          {label}
          {required && ' *'}
        </Text>
      )}

      <MuiTextField
        sx={[
          {
            marginTop: 0.5,
            mb: 0,
            input: { color: 'text.primary' },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        size={size || 'small'}
        value={value || value === 0 ? value : ''}
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
        {...props}
      />
    </Box>
  );
};

export default TextField;
