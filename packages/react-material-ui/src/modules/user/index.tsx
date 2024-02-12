'use client';

import React from 'react';
import CrudModule, { ModuleProps } from '../../modules/crud';
import { headers, schema, uiSchema } from './constants';

const UsersModule = (props: ModuleProps) => {
  return (
    <CrudModule
      title="Users"
      resource="user"
      tableProps={{
        tableSchema: headers,
        reordable: true,
      }}
      editFormProps={{
        formSchema: schema,
        formUiSchema: uiSchema,
      }}
      detailsFormProps={{
        formSchema: schema,
        formUiSchema: uiSchema,
      }}
      {...props}
    />
  );
};

export default UsersModule;
