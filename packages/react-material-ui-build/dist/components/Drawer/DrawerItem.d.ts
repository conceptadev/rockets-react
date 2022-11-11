import React, { FC } from 'react';
export declare type DrawerItemProps = {
    id: string;
    icon?: React.ReactNode;
    text: string;
    active?: boolean;
    collapsed?: boolean;
    onClick?: () => void;
};
declare const DrawerItem: FC<DrawerItemProps>;
export default DrawerItem;
