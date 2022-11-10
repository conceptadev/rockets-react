/// <reference types="react" />
export declare const Drawer: import("@emotion/styled").StyledComponent<import("@mui/material/Drawer").DrawerProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme>, {}, {}>;
declare type DrawerButtonProps = {
    active?: boolean;
    collapsed?: boolean;
};
export declare const DrawerButton: import("@emotion/styled").StyledComponent<{
    children?: import("react").ReactNode;
    classes?: Partial<import("@mui/material/Button").ButtonClasses>;
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    disabled?: boolean;
    disableElevation?: boolean;
    disableFocusRipple?: boolean;
    endIcon?: import("react").ReactNode;
    fullWidth?: boolean;
    href?: string;
    size?: "small" | "medium" | "large";
    startIcon?: import("react").ReactNode;
    sx?: import("@mui/material/styles").SxProps<import("@mui/material/styles").Theme>;
    variant?: "text" | "outlined" | "contained";
} & Omit<{
    action?: import("react").Ref<import("@mui/material").ButtonBaseActions>;
    centerRipple?: boolean;
    children?: import("react").ReactNode;
    classes?: Partial<import("@mui/material").ButtonBaseClasses>;
    disabled?: boolean;
    disableRipple?: boolean;
    disableTouchRipple?: boolean;
    focusRipple?: boolean;
    focusVisibleClassName?: string;
    LinkComponent?: import("react").ElementType<any>;
    onFocusVisible?: import("react").FocusEventHandler<any>;
    sx?: import("@mui/material/styles").SxProps<import("@mui/material/styles").Theme>;
    tabIndex?: number;
    TouchRippleProps?: Partial<import("@mui/material/ButtonBase/TouchRipple").TouchRippleProps>;
    touchRippleRef?: import("react").Ref<import("@mui/material/ButtonBase/TouchRipple").TouchRippleActions>;
}, "classes"> & import("@mui/material/OverridableComponent").CommonProps & Omit<Pick<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "key" | keyof import("react").ButtonHTMLAttributes<HTMLButtonElement>> & {
    ref?: import("react").Ref<HTMLButtonElement>;
}, "color" | "size" | keyof import("@mui/material/OverridableComponent").CommonProps | "children" | "sx" | "tabIndex" | "href" | "disabled" | "action" | "centerRipple" | "disableRipple" | "disableTouchRipple" | "focusRipple" | "focusVisibleClassName" | "LinkComponent" | "onFocusVisible" | "TouchRippleProps" | "touchRippleRef" | "disableElevation" | "disableFocusRipple" | "endIcon" | "fullWidth" | "startIcon" | "variant"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme> & DrawerButtonProps, {}, {}>;
export {};
