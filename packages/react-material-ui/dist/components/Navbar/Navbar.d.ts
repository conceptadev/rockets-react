/// <reference types="react" />
import { HeaderAccountProps } from '../HeaderAccount';
import { SxProps, Theme } from '@mui/material/styles';
export type NavbarProps = {
    drawerToggle?: () => void;
    showNotifications?: boolean;
    notificationsNumber?: number;
    notificationsOnClick?: () => void;
    avatar?: string;
    text?: string;
    subText?: string;
    headerMenuOptions?: HeaderAccountProps['menuOptions'];
    sx?: SxProps<Theme>;
};
export declare const Navbar: ({ drawerToggle, showNotifications, notificationsNumber, notificationsOnClick, avatar, text, subText, headerMenuOptions, sx, }: NavbarProps) => JSX.Element;
