/// <reference types="react" />
import { BoxProps, RadioGroupProps as MuiRadioGroupProps } from '@mui/material';
import { TextProps } from 'interfaces';
export type RadioOptions = {
    label: string;
    value: unknown;
    disabled?: boolean;
};
export type RadioGroupProps = MuiRadioGroupProps & {
    options: RadioOptions[];
    label?: string;
    required?: boolean;
    row?: boolean;
    disabled?: boolean;
    containerProps?: BoxProps;
    labelProps?: TextProps;
};
export declare const RadioGroup: (props: RadioGroupProps) => JSX.Element;
