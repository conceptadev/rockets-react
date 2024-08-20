import React from 'react';
import CrudModule, { ModuleProps } from '../crud';
import { CREATE_EDIT_FORM, DEFAULT_FILTERS, headers } from './constants';

type UsersModuleProps = {
  onEditSuccess: (data?: unknown) => void;
  onEditError: (data?: unknown) => void;
  onCreateSuccess: (data?: unknown) => void;
  onCreateError: (data?: unknown) => void;
  onDeleteSuccess: (data?: unknown) => void;
  onDeleteError: (data?: unknown) => void;
} & Partial<ModuleProps>;

const UsersModule = ({
  onEditError,
  onEditSuccess,
  onCreateSuccess,
  onCreateError,
  onDeleteSuccess,
  onDeleteError,
  ...props
}: UsersModuleProps) => {
  const tableProps = {
    tableSchema: headers,
    reordable: true,
    filters: DEFAULT_FILTERS,
    ...props.tableProps,
  };
  const createFormProps = {
    ...CREATE_EDIT_FORM,
    onSuccess: onCreateSuccess,
    onError: onCreateError,
    ...props.createFormProps,
  };
  const editFormProps = {
    ...CREATE_EDIT_FORM,
    onError: onEditError,
    onSuccess: onEditSuccess,
    onDeleteSuccess: onDeleteSuccess,
    onDeleteError: onDeleteError,
    ...props.editFormProps,
  };
  const detailsFormProps = { ...CREATE_EDIT_FORM, ...props.detailsFormProps };

  const enhancedProps = { ...props };
  delete enhancedProps.tableProps;
  delete enhancedProps.createFormProps;
  delete enhancedProps.editFormProps;
  delete enhancedProps.detailsFormProps;

  return (
    <CrudModule
      title="Users"
      resource="user"
      hideDeleteButton
      tableProps={tableProps}
      createFormProps={createFormProps}
      editFormProps={editFormProps}
      detailsFormProps={detailsFormProps}
      {...enhancedProps}
    />
  );
};

export default UsersModule;
