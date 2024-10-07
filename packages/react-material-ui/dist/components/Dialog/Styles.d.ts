import React from 'react';
import { DialogProps } from '@mui/material/Dialog';
declare const CustomDialog: import("@emotion/styled").StyledComponent<DialogProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme>, {}, {}>;
export interface DialogTitleProps {
    children?: React.ReactNode;
    onClose: () => void;
}
declare const CustomDialogTitle: (props: DialogTitleProps) => JSX.Element;
export { CustomDialog, CustomDialogTitle };
