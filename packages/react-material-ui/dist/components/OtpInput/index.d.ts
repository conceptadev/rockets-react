import React from 'react';
import type { BoxProps as MuiBoxProps } from '@mui/material/Box';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { TypographyProps } from '@mui/material';
type OmittedTextFieldProps = Omit<MuiTextFieldProps, 'onChange' | 'select' | 'multiline' | 'defaultValue' | 'value' | 'autoFocus' | 'variant'>;
type OmittedBoxProps = Omit<MuiBoxProps, 'onChange' | 'onBlur'>;
export interface BaseOtpInputProps {
    value?: string;
    length?: number;
    autoFocus?: boolean;
    textFieldProps?: OmittedTextFieldProps | ((index: number) => OmittedTextFieldProps);
    name?: string;
    label?: string;
    labelProps?: TypographyProps;
    onComplete?: (value: string) => void;
    onChange?: (value: string) => void;
    onBlur?: (value: string, isComplete: boolean) => void;
}
type OtpInputProps = OmittedBoxProps & BaseOtpInputProps;
export declare const KEYBOARD_KEYS: {
    readonly LEFT: "ArrowLeft";
    readonly RIGHT: "ArrowRight";
    readonly BACKSPACE: "Backspace";
    readonly HOME: "Home";
    readonly END: "End";
};
declare const OtpInput: React.ForwardRefExoticComponent<Omit<OtpInputProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export default OtpInput;
