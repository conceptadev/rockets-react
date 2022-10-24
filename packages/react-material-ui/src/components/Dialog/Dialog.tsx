import React, { FC } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { BootstrapDialog, BootstrapDialogTitle } from './Styles';

export interface DialogProps {
  open: boolean;
  handleClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  dividers?: boolean;
}

const CustomDialog: FC<DialogProps> = (props) => {
  const {
    open,
    handleClose,
    title,
    children,
    footer,
    dividers = false,
  } = props;

  return (
    <BootstrapDialog onClose={handleClose} open={open}>
      {title && (
        <BootstrapDialogTitle onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
      )}

      {children && (
        <DialogContent dividers={dividers}>{children}</DialogContent>
      )}

      {footer && <DialogActions>{footer}</DialogActions>}
    </BootstrapDialog>
  );
};

export default CustomDialog;
