/// <reference types="react" />
import { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import { TextProps } from 'interfaces';
export type CheckboxProps = MuiCheckboxProps & {
    label?: string;
    textProps?: TextProps;
};
export declare const Checkbox: (props: CheckboxProps) => JSX.Element;
