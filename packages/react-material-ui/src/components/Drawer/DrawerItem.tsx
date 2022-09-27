import React, { FC } from 'react';
import { DrawerButton } from './Styles';
import Text from '../Text';

export type DrawerItemProps = {
  id: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
};

const DrawerItem: FC<DrawerItemProps> = (props) => {
  const { icon, text, active, collapsed, onClick } = props;

  const handleClick = () => {
    return onClick?.();
  };

  return (
    <DrawerButton onClick={handleClick} active={active} collapsed={collapsed}>
      {icon}
      <Text fontSize={14} fontWeight={500} color="common.white">
        {text}
      </Text>
    </DrawerButton>
  );
};

export default DrawerItem;
