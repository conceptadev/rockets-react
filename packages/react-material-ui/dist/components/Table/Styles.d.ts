/// <reference types="react" />
import { Theme } from '@mui/material/styles';
export declare type TableProps = {
    variant?: 'clean' | 'contained' | 'outlined';
};
export declare const Table: import("@emotion/styled").StyledComponent<{
    children?: import("react").ReactNode;
    classes?: Partial<import("@mui/material/Table").TableClasses>;
    padding?: "none" | "checkbox" | "normal";
    size?: "small" | "medium";
    stickyHeader?: boolean;
    sx?: import("@mui/material/styles").SxProps<Theme>;
} & import("@mui/material/OverridableComponent").CommonProps & Omit<Pick<import("react").DetailedHTMLProps<import("react").TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, "key" | keyof import("react").TableHTMLAttributes<HTMLTableElement>> & {
    ref?: import("react").Ref<HTMLTableElement>;
}, "padding" | "size" | keyof import("@mui/material/OverridableComponent").CommonProps | "children" | "sx" | "stickyHeader"> & import("@mui/system").MUIStyledCommonProps<Theme> & TableProps, {}, {}>;
export declare const IconContainer: import("@emotion/styled").StyledComponent<import("@mui/system").SystemProps<Theme> & {
    children?: import("react").ReactNode;
    component?: import("react").ElementType<any>;
    ref?: import("react").Ref<unknown>;
    sx?: import("@mui/material/styles").SxProps<Theme>;
} & import("@mui/material/OverridableComponent").CommonProps & Omit<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof import("react").HTMLAttributes<HTMLDivElement>> & {
    ref?: import("react").Ref<HTMLDivElement>;
}, "ref" | keyof import("@mui/material/OverridableComponent").CommonProps | ("p" | "alignContent" | "alignItems" | "alignSelf" | "bottom" | "boxShadow" | "boxSizing" | "color" | "columnGap" | "display" | "flexBasis" | "flexDirection" | "flexGrow" | "flexShrink" | "flexWrap" | "fontFamily" | "fontSize" | "fontStyle" | "fontWeight" | "gridAutoColumns" | "gridAutoFlow" | "gridAutoRows" | "gridTemplateAreas" | "gridTemplateColumns" | "gridTemplateRows" | "height" | "justifyContent" | "justifyItems" | "justifySelf" | "left" | "letterSpacing" | "lineHeight" | "marginBottom" | "marginLeft" | "marginRight" | "marginTop" | "maxHeight" | "maxWidth" | "minHeight" | "minWidth" | "order" | "paddingBottom" | "paddingLeft" | "paddingRight" | "paddingTop" | "position" | "right" | "rowGap" | "textAlign" | "textOverflow" | "textTransform" | "top" | "visibility" | "whiteSpace" | "width" | "zIndex" | "border" | "borderBottom" | "borderColor" | "borderLeft" | "borderRadius" | "borderRight" | "borderTop" | "flex" | "gap" | "gridArea" | "gridColumn" | "gridRow" | "margin" | "overflow" | "padding" | "displayPrint" | "bgcolor" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "marginX" | "marginY" | "paddingX" | "paddingY" | "typography") | "children" | "component" | "sx"> & import("@mui/system").MUIStyledCommonProps<Theme>, {}, {}>;
