import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import { CustomDialog, CustomDialogTitle } from './Styles';

/**
 * Dialog component props.
 */
export type DialogProps = MuiDialogProps & {
  /** Whether the dialog is open */
  open: boolean;
  /** Function to handle closing of the dialog */
  handleClose: () => void;
  /** Optional title of the dialog */
  title?: string;
  /** Content to be displayed inside the dialog */
  children?: React.ReactNode;
  /** Footer content to be displayed inside the dialog */
  footer?: React.ReactNode;
  /** Whether to display dividers in the dialog content */
  dividers?: boolean;
};

/**
 * The Dialog component is a customizable modal dialog component. It integrates
 * with Material-UI's Dialog components and provides additional features like
 * responsive full-screen behavior and customizable titles and footers.
 *
 * @see [Storybook - Dialog](https://storybook.rockets.tools/?path=/docs/dialog)
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Dialog
 *   open={isOpen}
 *   handleClose={() => setIsOpen(false)}
 *   title="Dialog Title"
 *   dividers={true}
 *   footer={<div>Footer Content</div>}
 * >
 *   <p>Dialog content goes here</p>
 * </Dialog>
 * ```
 *
 * @param props - Dialog component props
 */
export const Dialog = (props: DialogProps) => {
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
