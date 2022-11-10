import { FC, ReactNode } from 'react';
import { DrawerItemProps } from '../Drawer/DrawerItem';
declare type Props = {
    drawerItems: DrawerItemProps[];
    currentId?: string;
    logo?: string;
    children: ReactNode;
    showNotifications?: boolean;
    notificationsNumber?: number;
    notificationsOnClick?: () => void;
    avatar?: string;
    text?: string;
    subText?: string;
};
declare const ContainerWithDrawer: FC<Props>;
export default ContainerWithDrawer;
