import React from 'react';
import { Box } from '@mui/material';

const VARIANT_COLOR_MAPPING = {
  veryWeak: 'lightgray',
  weak: 'red',
  medium: 'yellow',
  great: 'green',
};

export enum PasswordStrengthBarVariants {
  VeryWeak = 'veryWeak',
  Weak = 'weak',
  Medium = 'medium',
  Great = 'great',
}

export type PasswordStrengthBarProps = {
  variant: PasswordStrengthBarVariants;
};

const PasswordStrengthBar = ({
  variant = PasswordStrengthBarVariants.VeryWeak,
}: PasswordStrengthBarProps) => {
  return (
    <Box
      sx={{
        height: '4px',
        background: VARIANT_COLOR_MAPPING[variant],
        borderRadius: 1,
        width: '100%',
      }}
    />
  );
};

export default PasswordStrengthBar;
