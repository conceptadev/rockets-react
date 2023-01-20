import React, { FC } from 'react';
import { DrawerButton } from './Styles';
import Text from '../Text';
import { TextProps } from 'interfaces';

export type DrawerItemProps = {
  id: string;
  icon?: React.ReactNode;
  text: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
  textProps?: TextProps;
};

const DrawerItem: FC<DrawerItemProps> = (props) => {
  const {
    icon,
    text,
    active,
    collapsed,
    onClick,
    textProps = {
      fontSize: 14,
      fontWeight: 400,
      color: 'common.white',
    },
  } = props;

  const handleClick = () => {
    return onClick?.();
  };

  return (
    <DrawerButton onClick={handleClick} active={active} collapsed={collapsed}>
      {icon}
      <Text textProps={textProps}>{text}</Text>
    </DrawerButton>
  );
};

export default DrawerItem;
