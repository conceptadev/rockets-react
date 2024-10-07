import { ReactNode } from 'react';
import { ModuleProps } from '@concepta/react-material-ui/dist/modules/crud';
import { DrawerItemProps } from '@concepta/react-material-ui';
type ResourceProps = {
    id: string;
    name: string;
    icon: DrawerItemProps['icon'];
    showDrawerItem?: boolean;
    isUnprotected?: boolean;
    showAppBar?: boolean;
    module?: Partial<ModuleProps>;
    page?: ReactNode;
};
declare const Resource: ({ id }: ResourceProps) => JSX.Element;
export default Resource;
