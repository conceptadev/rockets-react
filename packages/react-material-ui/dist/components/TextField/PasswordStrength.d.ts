import { ReactNode } from 'react';
import { PasswordStrengthBarVariants } from './PasswordStrengthBar';
type PasswordStrengthProps = {
    passwordRuleVariant: PasswordStrengthBarVariants;
    passwordStrengthText: string;
    renderStrengthBar?: (variant: PasswordStrengthBarVariants, text: string) => ReactNode;
};
declare const PasswordStrength: ({ passwordRuleVariant, passwordStrengthText, renderStrengthBar, }: PasswordStrengthProps) => JSX.Element;
export default PasswordStrength;
