import { ReactNode } from 'react';
import { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
export type DialogProps = Omit<MuiDialogProps, 'title'> & {
    open: boolean;
    handleClose: () => void;
    title?: ReactNode;
    children?: ReactNode;
    footer?: ReactNode;
    dividers?: boolean;
};
export declare const Dialog: (props: DialogProps) => JSX.Element;
