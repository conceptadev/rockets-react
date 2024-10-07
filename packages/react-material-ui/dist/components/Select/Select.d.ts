/// <reference types="react" />
import { BoxProps, TextFieldProps } from '@mui/material';
import { TextProps } from 'interfaces';
export type SelectOptions = {
    label: string;
    value: string | number;
    disabled?: boolean;
};
export type SelectProps = TextFieldProps & {
    containerProps?: BoxProps;
    labelProps?: TextProps;
    options: SelectOptions[];
};
export declare const Select: (props: SelectProps) => JSX.Element;
