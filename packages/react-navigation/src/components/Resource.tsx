import React, { ReactNode } from 'react';
import { Route } from 'react-router-dom';
import { ModuleProps } from '@concepta/react-material-ui/dist/modules/crud';

type ResourceProps = {
  id: string;
  name?: string;
  icon?: ReactNode;
  showDrawerItem?: boolean;
  isUnprotected?: boolean;
  showAppBar?: boolean;
  module?: Partial<ModuleProps>;
  page?: ReactNode;
  isFormPage?: boolean;
};

const Resource = ({ id }: ResourceProps) => {
  return <Route path={id} />;
};

export default Resource;
