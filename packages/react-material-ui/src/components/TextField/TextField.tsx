import React, { ReactNode, useState } from 'react';
import {
  Box,
  BoxProps,
  FormControl,
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
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

/**
 * TextArea properties for multiline text fields.
 */
interface TextAreaProps {
  /** Indicates if the TextField should be multiline */
  multiline?: boolean;
  /** Number of rows to display when multiline */
  rows?: number;
  /** Maximum number of rows to display when multiline */
  maxRows?: number;
  /** Indicates if the label should be hidden */
  hiddenLabel?: boolean;
}

/**
 * Configuration for password strength evaluation.
 */
export type PasswordStrengthConfig = {
  /** Hides the text displaying password rules */
  hideRulesText?: boolean;
  /** Hides the password strength bar */
  hideStrengthBar?: boolean;
  /** List of password rules to be applied */
  rules?: PasswordRule[];
  /** Rules for matching password strength */
  matchRules?: {
    /** List of match rule texts */
    text: string[];
    /** Corresponding scores for the match rules */
    score: number[];
  };
  /** Custom renderer for the strength bar */
  renderStrengthBar?: (
    variant: PasswordStrengthBarVariants,
    text: string,
  ) => ReactNode;
  /** Custom renderer for the rules text */
  renderRulesText?: (
    name: string,
    value: string,
    rules: PasswordRule[],
  ) => ReactNode;
};

/**
 * Props for the TextField component.
 */
export type TextFieldProps = MuiTextFieldProps & {
  /** Props for the container Box */
  containerProps?: BoxProps;
  /** Props for the label Typography */
  labelProps?: TypographyProps;
  /** Options for the TextArea */
  options?: TextAreaProps;
  /** Configuration for password strength display */
  passwordStrengthConfig?: PasswordStrengthConfig;
};

/**
 * TextField component for inputting text with support for password strength
 * evaluation and visibility toggle. Integrates with MUI TextField and supports
 * custom rendering for password strength and rules. It's props extend from [Material UI's TextField](https://mui.com/material-ui/api/text-field/#props)
 * component props, so every prop is interchangeable between those two.
 *
 * @see [Storybook - TextField](https://storybook.rockets.tools/?path=/docs/textfield)
 *
 * @example
 * ```tsx
 * <TextField
 *   label="Password"
 *   type="password"
 *   passwordStrengthConfig={{
 *     hideStrengthBar: false,
 *     hideRulesText: false,
 *   }}
 * />
 * ```
 *
 * @param props - Properties to customize the TextField component
 */

export const TextField = (props: TextFieldProps) => {
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
      {/* {!ishiddenLabel && !!label && typeof label != 'string' && label} */}

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
        label={
          !ishiddenLabel &&
          !!label &&
          typeof label === 'string' && (
            <FormLabel
              name={name}
              label={label}
              required={required}
              labelProps={labelProps}
            />
          )
        }
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
    </Box>
  );
};
