import { ReactNode } from 'react';
import { TextProps } from 'interfaces';
export type DropdownItem = {
    key: string;
    onClick?: () => void;
    text?: string;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
};
export type DropdownProps = {
    options: DropdownItem[];
    toggleDirection?: 'horizontal' | 'vertical';
    textProps?: TextProps;
};
export declare const Dropdown: ({ options, toggleDirection, textProps, }: DropdownProps) => JSX.Element;
