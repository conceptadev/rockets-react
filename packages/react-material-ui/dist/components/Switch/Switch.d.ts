/// <reference types="react" />
import { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';
import { TextProps } from 'interfaces';
export type SwitchProps = MuiSwitchProps & {
    label?: string;
    textProps?: TextProps;
};
export declare const Switch: (props: SwitchProps) => JSX.Element;
