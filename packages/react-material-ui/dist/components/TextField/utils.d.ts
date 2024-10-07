import { PasswordStrengthBarVariants } from './PasswordStrengthBar';
import { PasswordStrengthConfig } from './TextField';
import { PasswordRule } from './constants';
export declare const validatePasswordScore: (password: string, rules?: PasswordRule[], minValidationScore?: number) => boolean;
export declare const getPasswordScore: (password: string | null, rules: PasswordRule[]) => number;
export declare const getPasswordMatchInfo: (score: number, matchRules: PasswordStrengthConfig['matchRules']) => [string, PasswordStrengthBarVariants];
