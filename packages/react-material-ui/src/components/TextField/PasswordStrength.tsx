import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PasswordStrengthBar, {
  PasswordStrengthBarVariants,
} from './PasswordStrengthBar';

type PasswordStrengthProps = {
  passwordRuleVariant: PasswordStrengthBarVariants;
  passwordStrengthText: string;
  renderStrengthBar?: (
    variant: PasswordStrengthBarVariants,
    text: string,
  ) => ReactNode;
};

const PasswordStrength = ({
  passwordRuleVariant,
  passwordStrengthText,
  renderStrengthBar,
}: PasswordStrengthProps) => {
  if (renderStrengthBar) {
    return <>{renderStrengthBar(passwordRuleVariant, passwordStrengthText)}</>;
  }

  return (
    <Box mt={1}>
      <Box display="flex" gap={2}>
        {[...Array(4)].map((_, index) => (
          <PasswordStrengthBar
            key={`password-bar-${index}`}
            variant={passwordRuleVariant}
          />
        ))}
      </Box>

      <Typography textAlign="end" color="grey.400" variant="subtitle2" mt={0.5}>
        {passwordStrengthText}
      </Typography>
    </Box>
  );
};

export default PasswordStrength;
