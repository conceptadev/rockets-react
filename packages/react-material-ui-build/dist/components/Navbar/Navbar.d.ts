import { FC } from 'react';
declare type Props = {
    drawerToggle?: () => void;
    showNotifications?: boolean;
    notificationsNumber?: number;
    notificationsOnClick?: () => void;
    avatar?: string;
    text?: string;
    subText?: string;
};
declare const Navbar: FC<Props>;
export default Navbar;
