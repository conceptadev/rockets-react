import React, { ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Close from '@mui/icons-material/Close';
import Text from '../Text';
import { TextProps } from 'interfaces';

/**
 * SideModal component props.
 */
export type SideModalProps = {
  /** Whether the drawer is open */
  open: boolean;
  /** Function to toggle the drawer open/close state */
  toggleDrawer: () => void;
  /** Optional title text to display in the header */
  title?: string;
  /** Props to pass to the Text component */
  textProps?: TextProps;
  /** Background color of the drawer */
  backgroundColor?: string;
  /** Background color of the header */
  headerBackgroundColor?: string;
  /** Color of the close icon */
  closeIconColor?: string;
  /** Width of the drawer */
  width?: string | number;
  /** Side of the screen from which the drawer will appear ("left" | "top" | "right" | "bottom") */
  anchor?: DrawerProps['anchor'];
  /** Custom styles to apply to the drawer */
  sx?: SxProps<Theme>;
  /** Content to display inside the drawer */
  children?: ReactNode;
};

/**
 * The SideModal component is a slide-out drawer used for displaying
 * additional content without navigating away from the current page. It
 * supports customization for styling, positioning, and content.
 *
 * @see [Storybook - SideModal](https://storybook.rockets.tools/?path=/docs/sidemodal)
 *
 * @example
 * ```tsx
 * <SideModal
 *   open={true}
 *   toggleDrawer={() => setOpen(false)}
 *   title="My Modal"
 *   backgroundColor="#fff"
 *   headerBackgroundColor="#3f51b5"
 *   closeIconColor="#f50057"
 *   width="400px"
 *   anchor="left"
 * >
 *   <div>Content goes here</div>
 * </SideModal>
 * ```
 *
 * @param props - SideModal component props
 */
export const SideModal = (props: SideModalProps) => {
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
