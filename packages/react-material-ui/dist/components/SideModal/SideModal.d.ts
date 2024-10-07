import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { DrawerProps } from '@mui/material/Drawer';
import { TextProps } from 'interfaces';
export type SideModalProps = {
    open: boolean;
    toggleDrawer: () => void;
    title?: string;
    textProps?: TextProps;
    backgroundColor?: string;
    headerBackgroundColor?: string;
    closeIconColor?: string;
    width?: string | number;
    anchor?: DrawerProps['anchor'];
    sx?: SxProps<Theme>;
    children?: ReactNode;
};
export declare const SideModal: (props: SideModalProps) => JSX.Element;
