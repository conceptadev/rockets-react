import React, { ReactNode } from 'react';
import { Route } from 'react-router-dom';
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

const Resource = ({ id }: ResourceProps) => {
  return <Route path={id} />;
};

export default Resource;
