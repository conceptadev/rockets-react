'use client';

import React from 'react';
import CrudModule, { ModuleProps } from '../crud';
import { CREATE_EDIT_FORM, DEFAULT_FILTERS, headers } from './constants';

type UsersModuleProps = {
  onEditSuccess: (data?: unknown) => void;
  onEditError: (data?: unknown) => void;
} & Partial<ModuleProps>;

const UsersModule = ({
  onEditError,
  onEditSuccess,
  ...props
}: UsersModuleProps) => {
  return (
    <CrudModule
      title="Users"
      resource="user"
      hideDeleteButton
      tableProps={{
        tableSchema: headers,
        reordable: true,
        filters: DEFAULT_FILTERS,
      }}
      editFormProps={{
        ...CREATE_EDIT_FORM,
        onError: onEditError,
        onSuccess: onEditSuccess,
      }}
      detailsFormProps={CREATE_EDIT_FORM}
      {...props}
    />
  );
};

export default UsersModule;
