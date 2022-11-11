import React, { FC } from 'react';
export interface DialogProps {
    open: boolean;
    handleClose: () => void;
    title?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    dividers?: boolean;
}
declare const Dialog: FC<DialogProps>;
export default Dialog;
