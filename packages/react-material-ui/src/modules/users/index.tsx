'use client';

import React from 'react';

import CrudModule, { ModuleProps } from '../crud';
import {
  getTableHeaders,
  getDefaultFilters,
  getFormSchema,
  uiSchema,
} from './constants';

import { useTranslation } from '../../utils/i18n';

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
  const { t } = useTranslation();

  const tableProps = {
    tableSchema: getTableHeaders(),
    reordable: true,
    filters: getDefaultFilters(),
    ...props.tableProps,
  };
  const createFormProps = {
    ...getFormSchema(),
    formUiSchema: uiSchema,
    onSuccess: onCreateSuccess,
    onError: onCreateError,
    ...props.createFormProps,
  };
  const editFormProps = {
    ...getFormSchema(),
    formUiSchema: uiSchema,
    onError: onEditError,
    onSuccess: onEditSuccess,
    onDeleteSuccess: onDeleteSuccess,
    onDeleteError: onDeleteError,
    ...props.editFormProps,
  };
  const detailsFormProps = {
    ...getFormSchema(),
    formUiSchema: uiSchema,
    ...props.detailsFormProps,
  };

  const enhancedProps = { ...props };
  delete enhancedProps.tableProps;
  delete enhancedProps.createFormProps;
  delete enhancedProps.editFormProps;
  delete enhancedProps.detailsFormProps;

  return (
    <CrudModule
      title={t('users:title')}
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
