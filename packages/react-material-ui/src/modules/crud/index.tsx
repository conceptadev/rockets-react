import React from 'react';

import type { RJSFSchema, UiSchema } from '@rjsf/utils';

import type { HeaderProps } from '../../components/Table/types';

import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';

import useTable from '../../components/Table/useTable';
import Text from '../../components/Text';
import TableSubmodule from '../../components/submodules/Table';
import DrawerFormSubmodule from '../../components/submodules/DrawerForm';
import ModalFormSubmodule from '../../components/submodules/ModalForm';

type Action = 'creation' | 'edit' | 'details' | null;

type SelectedRow = Record<string, unknown> | null;

type TableSchemaItem = HeaderProps & {
  format?: (data: string | number) => string | number;
};

interface TableProps {
  tableSchema?: TableSchemaItem[];
  searchParam?: string;
  hideActionsColumn?: boolean;
  overrideDefaults?: boolean;
}

interface FormProps {
  formSchema?: RJSFSchema;
  formUiSchema?: UiSchema;
  submitButtonTitle?: string;
  cancelButtonTitle?: string;
  overrideDefaults?: boolean;
}

interface ModuleProps {
  title?: string;
  resource: string;
  tableProps?: TableProps;
  formContainerVariation?: 'drawer' | 'modal';
  formProps?: FormProps;
}

const CrudModule = (props: ModuleProps) => {
  const [drawerViewMode, setDrawerViewMode] = useState<Action>(null);
  const [selectedRow, setSelectedRow] = useState<SelectedRow>(null);

  const tableProps = useTable(props.resource, {
    callbacks: {
      onError: () => toast.error('Failed to fetch data.'),
    },
  });

  const FormComponent = useMemo(() => {
    switch (props.formContainerVariation) {
      case 'drawer':
        return DrawerFormSubmodule;
      case 'modal':
        return ModalFormSubmodule;
      default:
        return DrawerFormSubmodule;
    }
  }, [props.formContainerVariation]);

  return (
    <Box>
      {props.title ? (
        <Text fontFamily="Inter" fontSize={20} fontWeight={800} mt={4} mb={4}>
          {props.title}
        </Text>
      ) : null}

      <TableSubmodule
        queryResource={props.resource}
        onAction={(payload) => {
          setSelectedRow(payload.row);
          setDrawerViewMode(payload.action);
        }}
        onAddNew={() => {
          setSelectedRow(null);
          setDrawerViewMode('creation');
        }}
        {...tableProps}
        {...props.tableProps}
      />

      <FormComponent
        title={props.title}
        queryResource={props.resource}
        viewMode={drawerViewMode}
        formData={selectedRow}
        onSubmitSuccess={() => {
          tableProps.refresh();
          setSelectedRow(null);
          setDrawerViewMode(null);
        }}
        onClose={() => {
          setSelectedRow(null);
          setDrawerViewMode(null);
        }}
        {...props.formProps}
      />
    </Box>
  );
};

export default CrudModule;
