/// <reference types="react" />
import { Theme } from '@mui/material/styles';
export type TableProps = {
    variant?: 'clean' | 'contained' | 'outlined';
};
export declare const Table: import("@emotion/styled").StyledComponent<import("@mui/material/Table").TableOwnProps & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, "ref"> & {
    ref?: import("react").Ref<HTMLTableElement>;
}, "style" | "children" | "padding" | "size" | "className" | "classes" | "sx" | "stickyHeader"> & import("@mui/system").MUIStyledCommonProps<Theme> & TableProps, {}, {}>;
export declare const IconContainer: import("@emotion/styled").StyledComponent<import("@mui/system").BoxOwnProps<Theme> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: import("react").Ref<HTMLDivElement>;
}, keyof import("@mui/system").BoxOwnProps<Theme>> & import("@mui/system").MUIStyledCommonProps<Theme>, {}, {}>;
