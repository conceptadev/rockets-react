/// <reference types="react" />
import { SxProps, Theme } from '@mui/material/styles';
export type StyledDrawerProps = {
    sx?: SxProps<Theme>;
    horizontal?: boolean;
    backgroundColor?: string;
    collapsedWidth?: string | number;
    expandedWidth?: string | number;
};
export declare const StyledDrawer: import("@emotion/styled").StyledComponent<import("@mui/material").DrawerProps & import("@mui/system").MUIStyledCommonProps<Theme> & StyledDrawerProps, {}, {}>;
export type DrawerButtonProps = {
    active?: boolean;
    collapsed?: boolean;
    sx?: SxProps<Theme>;
    horizontal?: boolean;
    iconColor?: string;
    activeIconColor?: string;
};
export declare const DrawerButton: import("@emotion/styled").StyledComponent<import("@mui/material").ButtonOwnProps & Omit<import("@mui/material").ButtonBaseOwnProps, "classes"> & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & {
    ref?: import("react").Ref<HTMLButtonElement>;
}, "style" | "children" | "disabled" | "color" | "size" | "className" | "classes" | "sx" | "variant" | "tabIndex" | "href" | "action" | "centerRipple" | "disableRipple" | "disableTouchRipple" | "focusRipple" | "focusVisibleClassName" | "LinkComponent" | "onFocusVisible" | "TouchRippleProps" | "touchRippleRef" | "disableFocusRipple" | "disableElevation" | "endIcon" | "fullWidth" | "startIcon"> & import("@mui/system").MUIStyledCommonProps<Theme> & DrawerButtonProps, {}, {}>;
