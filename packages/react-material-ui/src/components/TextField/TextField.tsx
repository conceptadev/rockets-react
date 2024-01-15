import React, { useState } from 'react';
import {
  Box,
  BoxProps,
  FormControl,
  FormLabel,
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps,
  TypographyProps,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Text from '../Text';

const TEXT_INITIAL_PROPS = {
  fontSize: 14,
  fontWeight: 500,
  color: 'text.primary',
};

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

const TextField = (props: TextFieldProps & Props) => {
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
    name,
    ...rest
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
    <Box {...containerProps}>
      <FormControl>
        {!ishiddenLabel && label && (
          <FormLabel htmlFor={name}>
            <Text textAlign="left" {...TEXT_INITIAL_PROPS} {...labelProps}>
              {`${label}${required ? ' *' : ''}`}
            </Text>
          </FormLabel>
        )}

        <MuiTextField
          {...rest}
          sx={[
            {
              marginTop: 0.5,
              mb: 0,
              input: { color: 'text.primary' },
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
          id={name}
          name={name}
          size={size || 'small'}
          value={value || value === 0 ? value : ''}
          hiddenLabel={label ? true : ishiddenLabel}
          label={''}
          fullWidth
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          InputProps={{
            ...(isPassword && {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePassword}
                    onMouseDown={handleMouseDownPassword}
                    data-testid="toggle-password-button"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }),
            ...props.InputProps,
          }}
          data-testid="text-field"
        />
      </FormControl>
    </Box>
  );
};

export default TextField;
