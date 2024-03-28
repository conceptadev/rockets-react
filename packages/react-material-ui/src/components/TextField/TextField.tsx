import React, { ReactNode, useState } from 'react';
import {
  Box,
  BoxProps,
  FormControl,
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps,
  TypographyProps,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FormLabel from '../FormLabel';
import { getPasswordMatchInfo, getPasswordScore } from './utils';
import {
  PASSWORD_DEFAULT_RULES,
  PASSWORD_MATCH_RULES,
  PasswordRule,
} from './constants';

import PasswordStrengthRules from './PasswordStrengthRules';
import PasswordStrength from './PasswordStrength';
import { PasswordStrengthBarVariants } from './PasswordStrengthBar';

interface TextAreaProps {
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  hiddenLabel?: boolean;
}

export type PasswordStrengthConfig = {
  hideRulesText?: boolean;
  hideStrengthBar?: boolean;
  rules?: PasswordRule[];
  matchRules?: {
    text: string[];
    score: number[];
  };
  renderStrengthBar?: (
    variant: PasswordStrengthBarVariants,
    text: string,
  ) => ReactNode;
  renderRulesText?: (
    name: string,
    value: string,
    rules: PasswordRule[],
  ) => ReactNode;
};

interface Props {
  containerProps?: BoxProps;
  labelProps?: TypographyProps;
  options?: TextAreaProps;
  passwordStrengthConfig?: PasswordStrengthConfig;
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
    passwordStrengthConfig,
    ...rest
  } = props;

  const passwordStrengthConfigDefault = {
    hideStrengthBar: passwordStrengthConfig?.hideStrengthBar ?? true,
    hideRulesText: passwordStrengthConfig?.hideRulesText ?? true,
    rules: passwordStrengthConfig?.rules ?? PASSWORD_DEFAULT_RULES,
    matchRules: passwordStrengthConfig?.matchRules ?? PASSWORD_MATCH_RULES,
    renderStrengthBar: passwordStrengthConfig?.renderStrengthBar,
    renderRulesText: passwordStrengthConfig?.renderRulesText,
  };

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

  const passwordScore = getPasswordScore(
    value as string,
    passwordStrengthConfigDefault.rules,
  );
  const [passwordStrengthText, passwordRuleVariant] = getPasswordMatchInfo(
    passwordScore,
    passwordStrengthConfigDefault.matchRules,
  );

  return (
    <Box {...containerProps}>
      <FormControl fullWidth>
        {!ishiddenLabel && !!label && typeof label === 'string' && (
          <FormLabel
            name={name}
            label={label}
            required={required}
            labelProps={labelProps}
          />
        )}
        {!ishiddenLabel && !!label && typeof label != 'string' && label}

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

        {isPassword && (
          <>
            {!passwordStrengthConfigDefault.hideStrengthBar && (
              <PasswordStrength
                passwordRuleVariant={passwordRuleVariant}
                passwordStrengthText={passwordStrengthText}
                renderStrengthBar={
                  passwordStrengthConfigDefault.renderStrengthBar
                }
              />
            )}

            {!passwordStrengthConfigDefault.hideRulesText && (
              <PasswordStrengthRules
                name={name}
                value={value}
                rules={passwordStrengthConfigDefault.rules}
                renderRulesText={passwordStrengthConfigDefault.renderRulesText}
              />
            )}
          </>
        )}
      </FormControl>
    </Box>
  );
};

export default TextField;
