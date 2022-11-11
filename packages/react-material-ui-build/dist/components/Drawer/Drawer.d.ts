import { FC } from 'react';
import { DrawerItemProps } from './DrawerItem';
declare type Props = {
    items: DrawerItemProps[];
    currentId?: string;
    toggleMobileDrawer: () => void;
    mobileIsOpen: boolean;
    logo?: string;
};
declare const Drawer: FC<Props>;
export default Drawer;
