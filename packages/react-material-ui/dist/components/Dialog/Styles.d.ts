import React, { FC } from 'react';
declare const CustomDialog: import("@emotion/styled").StyledComponent<import("@mui/material/Dialog").DialogProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme>, {}, {}>;
export interface DialogTitleProps {
    children?: React.ReactNode;
    onClose: () => void;
}
declare const CustomDialogTitle: FC<DialogTitleProps>;
export { CustomDialog, CustomDialogTitle };
