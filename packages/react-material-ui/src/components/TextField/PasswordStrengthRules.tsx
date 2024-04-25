import React, { ReactNode } from 'react';
import { Box, FormHelperText } from '@mui/material';
import { PasswordRule } from './constants';

type PasswordStrengthRulesProps = {
  name: string;
  value: unknown;
  rules: PasswordRule[];
  renderRulesText?: (
    name: string,
    value: string,
    rules: PasswordRule[],
  ) => ReactNode;
};

const PasswordStrengthRules = ({
  name,
  value,
  rules,
  renderRulesText,
}: PasswordStrengthRulesProps) => {
  if (renderRulesText) {
    return <>{renderRulesText(name, value as string, rules)}</>;
  }

  return (
    <Box mt={2}>
      <FormHelperText
        sx={(theme) => ({
          color: theme.palette.common.black,
        })}
      >
        Password should contain at least:
      </FormHelperText>
      {rules?.map((rule) => (
        <FormHelperText
          id={name}
          sx={(theme) => ({
            color:
              value && (value as string)?.match(rule.pattern)
                ? theme.palette.success.main
                : theme.palette.common.black,
          })}
        >
          {rule.label}
        </FormHelperText>
      ))}
    </Box>
  );
};

export default PasswordStrengthRules;
