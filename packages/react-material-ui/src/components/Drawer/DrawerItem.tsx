import React, { FC } from 'react';
import { DrawerButton } from './Styles';
import Text from '../Text';
import { TypographyProps } from '@mui/material/Typography';

export type DrawerItemProps = {
  id: string;
  icon?: React.ReactNode;
  text: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
  fontFamily?: TypographyProps['fontFamily'];
};

const DrawerItem: FC<DrawerItemProps> = (props) => {
  const { icon, text, active, collapsed, onClick, fontFamily } = props;

  const handleClick = () => {
    return onClick?.();
  };

  return (
    <DrawerButton onClick={handleClick} active={active} collapsed={collapsed}>
      {icon}
      <Text
        fontSize={14}
        fontWeight={400}
        color="common.white"
        fontFamily={fontFamily}
      >
        {text}
      </Text>
    </DrawerButton>
  );
};

export default DrawerItem;
