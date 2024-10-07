import React from 'react';
import { DrawerButtonProps } from './Styles';
import { TextProps } from '../../interfaces';
export declare const DEFAULT_DRAWER_TEXT_PROPS: {
    fontSize: number;
    fontWeight: number;
    color: string;
};
export type DrawerItemProps = {
    id?: string;
    component?: React.ReactNode | ((active?: boolean, collapsed?: boolean) => React.ReactNode);
    icon?: React.ReactNode | ((active: boolean) => React.ReactNode);
    text?: string;
    onClick?: () => void;
    textProps?: TextProps;
    temporary?: boolean;
} & DrawerButtonProps;
export declare const DrawerItem: (props: DrawerItemProps) => JSX.Element;
