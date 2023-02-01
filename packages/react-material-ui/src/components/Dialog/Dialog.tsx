import React, { FC } from 'react';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DialogProps } from '@mui/material/Dialog';
import { CustomDialog, CustomDialogTitle } from './Styles';

export interface CustomDialogProps {
  open: boolean;
  handleClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  dividers?: boolean;
}

const Dialog: FC<CustomDialogProps & DialogProps> = (props) => {
  const {
    open,
    handleClose,
    title,
    children,
    footer,
    dividers = false,
  } = props;

  const theme = useTheme();
  const fullScreen =
    props?.fullScreen || useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <CustomDialog
      {...props}
      onClose={handleClose}
      open={open}
      fullScreen={fullScreen}
    >
      {title && (
        <CustomDialogTitle onClose={handleClose}>{title}</CustomDialogTitle>
      )}

      {children && (
        <DialogContent dividers={dividers}>{children}</DialogContent>
      )}

      {footer && <DialogActions>{footer}</DialogActions>}
    </CustomDialog>
  );
};

export default Dialog;
