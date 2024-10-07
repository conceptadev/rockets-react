import { ReactNode } from 'react';
import { BoxProps, TextFieldProps as MuiTextFieldProps, TypographyProps } from '@mui/material';
import { PasswordRule } from './constants';
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
    renderStrengthBar?: (variant: PasswordStrengthBarVariants, text: string) => ReactNode;
    renderRulesText?: (name: string, value: string, rules: PasswordRule[]) => ReactNode;
};
export type TextFieldProps = MuiTextFieldProps & {
    containerProps?: BoxProps;
    labelProps?: TypographyProps;
    options?: TextAreaProps;
    passwordStrengthConfig?: PasswordStrengthConfig;
};
export declare const TextField: (props: TextFieldProps) => JSX.Element;
export {};
