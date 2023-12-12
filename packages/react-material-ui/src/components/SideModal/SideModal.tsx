import React, { FC, ReactNode } from 'react';
import { useTheme } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Close from '@mui/icons-material/Close';
import Text from '../Text';
import { TextProps } from 'interfaces';

export type SideModalProps = {
  open: boolean;
  toggleDrawer: () => void;
  title?: string;
  textProps?: TextProps;
  backgroundColor?: string;
  headerBackgroundColor?: string;
  closeIconColor?: string;
  width?: string | number;
  anchor?: DrawerProps['anchor'];
  sx?: SxProps<Theme>;
  children?: ReactNode;
};

const SideModal: FC<SideModalProps> = (props) => {
  const {
    open,
    toggleDrawer,
    title,
    textProps = {
      fontSize: 18,
      fontWeight: 500,
      color: 'common.white',
      fontFamily: "'Inter', sans-serif",
    },
    backgroundColor,
    headerBackgroundColor,
    closeIconColor,
    width,
    anchor = 'right',
    sx,
    children,
  } = props;
  const theme = useTheme();

  return (
    <MuiDrawer
      anchor={anchor}
      variant="temporary"
      open={open}
      onClose={toggleDrawer}
      sx={[
        {
          '& .MuiDrawer-paper': {
            backgroundColor: backgroundColor || theme.palette.common.white,
            width: width || '33%',
            minWidth: width || '448px',
            [theme.breakpoints.down('sm')]: {
              width: width || '100%',
              minWidth: 'auto',
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      data-testid="side-modal"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={(theme) => ({
          backgroundColor: headerBackgroundColor || theme.palette.primary.main,
          padding: '16px 16px 16px 24px',
        })}
        data-testid="side-modal-header"
      >
        {title && <Text {...textProps}>{title}</Text>}
        <IconButton
          onClick={toggleDrawer}
          sx={{
            marginLeft: 'auto',
            color: closeIconColor || theme.palette.common.white,
          }}
          data-testid="side-modal-close-button"
        >
          <Close />
        </IconButton>
      </Box>
      {children}
    </MuiDrawer>
  );
};

export default SideModal;
