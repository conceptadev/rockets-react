import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { DrawerButton } from './Styles';
import Text from '../Text';

export type DrawerItemProps = {
  id: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
  path?: string;
};

const DrawerItem: FC<DrawerItemProps> = (props) => {
  const { icon, text, active, collapsed, onClick, path } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      return navigate(path);
    }
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
