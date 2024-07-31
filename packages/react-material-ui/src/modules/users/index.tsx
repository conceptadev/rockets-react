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
} & Partial<ModuleProps>;

const UsersModule = ({
  onEditError,
  onEditSuccess,
  onCreateSuccess,
  onCreateError,
  ...props
}: UsersModuleProps) => {
  const { t } = useTranslation();

  return (
    <CrudModule
      title={t('users:title')}
      resource="user"
      hideDeleteButton
      tableProps={{
        tableSchema: getTableHeaders(),
        reordable: true,
        filters: getDefaultFilters(),
      }}
      createFormProps={{
        formSchema: getFormSchema(),
        formUiSchema: uiSchema,
        onSuccess: onCreateSuccess,
        onError: onCreateError,
      }}
      editFormProps={{
        formSchema: getFormSchema(),
        formUiSchema: uiSchema,
        onError: onEditError,
        onSuccess: onEditSuccess,
      }}
      detailsFormProps={{
        formSchema: getFormSchema(),
        formUiSchema: uiSchema,
      }}
      {...props}
    />
  );
};

export default UsersModule;
