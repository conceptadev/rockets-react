import { ReactNode } from 'react';
import { TextProps } from 'interfaces';
export type HeaderAccountProps = {
    avatar?: string;
    avatarSize?: number;
    text?: string;
    subText?: string;
    onClick?: () => void;
    textProps?: TextProps;
    subTextProps?: TextProps;
    iconColor?: string;
    menuOptions?: (handleClose: () => void) => ReactNode;
};
export declare const HeaderAccount: ({ avatar, avatarSize, text, subText, onClick, textProps, subTextProps, iconColor, menuOptions, }: HeaderAccountProps) => JSX.Element;
