'use client';

import React from 'react';
import CrudModule, { ModuleProps } from '../crud';
import { CREATE_EDIT_FORM, DEFAULT_FILTERS, headers } from './constants';

type UsersModuleProps = {
  onEditSuccess: (data?: unknown) => void;
  onEditError: (data?: unknown) => void;
  onCreateSuccess: (data?: unknown) => void;
  onCreateError: (data?: unknown) => void;
} & Partial<ModuleProps>;

const UsersModule = ({
  onEditError,
  onEditSuccess,
  onCreateSuccess,
  onCreateError,
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
      createFormProps={{
        ...CREATE_EDIT_FORM,
        onSuccess: onCreateSuccess,
        onError: onCreateError,
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
