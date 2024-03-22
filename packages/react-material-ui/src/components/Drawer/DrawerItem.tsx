import React from 'react';
import { Box } from '@mui/material';
import { DrawerButton, DrawerButtonProps } from './Styles';
import Text from '../Text';
import { TextProps } from 'interfaces';

export type DrawerItemProps = {
  id?: string;
  component?:
    | React.ReactNode
    | ((active?: boolean, collapsed?: boolean) => React.ReactNode);
  icon?: React.ReactNode | ((active: boolean) => React.ReactNode);
  text?: string;
  onClick?: () => void;
  textProps?: TextProps;
  temporary?: boolean;
} & DrawerButtonProps;

const DrawerItem = (props: DrawerItemProps) => {
  const {
    id,
    icon,
    text,
    active,
    collapsed,
    onClick,
    textProps = {
      fontSize: 12,
      fontWeight: 400,
      color: 'common.white',
    },
    sx,
    horizontal,
    iconColor,
    activeIconColor,
    temporary,
  } = props;

  const handleClick = () => {
    return onClick?.();
  };

  return (
    <DrawerButton
      className={`Rockets-DrawerButton ${active ? 'active' : ''}`}
      data-testid={`drawer-item-${id}-${temporary ? 'temporary' : 'permanent'}`}
      active={active}
      collapsed={collapsed}
      onClick={handleClick}
      sx={sx}
      horizontal={horizontal}
      iconColor={iconColor}
      activeIconColor={activeIconColor}
    >
      {typeof icon === 'function' ? icon(!!active) : icon}
      {text && horizontal && (
        <Box display="flex" alignItems="center">
          <Text {...textProps} position="absolute">
            {text}
          </Text>
        </Box>
      )}
      {text && !horizontal && (
        <Text
          {...textProps}
          sx={{
            position: 'absolute',
            bottom: 0,
          }}
        >
          {text}
        </Text>
      )}
    </DrawerButton>
  );
};

export default DrawerItem;
