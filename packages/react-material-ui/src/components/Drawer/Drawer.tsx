import React, { FC, useState } from 'react';
import { Drawer as CustomDrawer } from './Styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import DrawerItem, { DrawerItemProps } from './DrawerItem';
import Image from '../Image';
import Text from '../Text';

type Props = {
  items: DrawerItemProps[];
  currentId: string;
  logo?: string;
};

const Drawer: FC<Props> = (props) => {
  const { items, currentId, logo } = props;

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <CustomDrawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: '20px 16px 17px !important',
        }}
      >
        {logo && <Image src={logo} alt="Logo" />}
      </Toolbar>

      {items.map((item) => (
        <DrawerItem
          key={item.id}
          {...item}
          collapsed={!open}
          active={item.id === currentId}
        />
      ))}

      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <Text fontSize={14} fontWeight={500} color="primary.contrastText">
            {open ? <ChevronLeft /> : <ChevronRight />}
          </Text>
        </IconButton>
      </Toolbar>
    </CustomDrawer>
  );
};

export default Drawer;
