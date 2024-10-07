import { ReactNode } from 'react';
import { PasswordRule } from './constants';
type PasswordStrengthRulesProps = {
    name: string;
    value: unknown;
    rules: PasswordRule[];
    renderRulesText?: (name: string, value: string, rules: PasswordRule[]) => ReactNode;
};
declare const PasswordStrengthRules: ({ name, value, rules, renderRulesText, }: PasswordStrengthRulesProps) => JSX.Element;
export default PasswordStrengthRules;
