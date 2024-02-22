'use client';

import dynamic from 'next/dynamic';

const CrudModule = dynamic(
  () => import('@concepta/react-material-ui/dist/modules/crud'),
  { ssr: false },
);

import { CustomSelectWidget } from '@concepta/react-material-ui/dist/styles/CustomWidgets';

import { getMaskedPhone } from '@/utils/mask';

const defaultFormSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Name' },
    address: { type: 'string', title: 'Address' },
    city: { type: 'string', title: 'City' },
    state: { type: 'string', title: 'State' },
    phone: { type: 'string', title: 'Phone' },
    owner: {
      type: 'number',
      title: 'Owner',
      oneOf: [
        { const: 1, title: 'John Doe' },
        { const: 2, title: 'Jane Doe' },
      ],
    },
  },
};

const defaultFormUiSchema = {
  city: {
    'ui:gridColumns': 6,
  },
  state: {
    'ui:gridColumns': 6,
  },
  phone: {
    'ui:gridColumns': 6,
    'ui:formatter': (value: string) => getMaskedPhone(value),
  },
  owner: {
    'ui:widget': CustomSelectWidget,
    'ui:gridColumns': 6,
  },
};

const Organizations = () => {
  return (
    <CrudModule
      resource="api/organizations"
      formContainerVariation="modal"
      title="Organization management"
      tableProps={{
        tableSchema: [
          { id: 'id', label: 'ID' },
          { id: 'name', label: 'Name' },
          { id: 'address', label: 'Address' },
          { id: 'city', label: 'City' },
          { id: 'state', label: 'State' },
          { id: 'phone', label: 'Phone' },
          {
            id: 'creationDate',
            label: 'Creation Date',
            format: (data: unknown) => new Date(String(data)).toDateString(),
          },
        ],
        searchParam: 'name',
        filters: [
          {
            id: 'id',
            label: 'ID',
            operator: 'eq',
            type: 'text',
            columns: 3,
          },
          {
            id: 'name',
            label: 'Name',
            operator: 'contL',
            type: 'text',
            columns: 3,
          },
        ],
      }}
      createFormProps={{
        formSchema: {
          ...defaultFormSchema,
          required: ['name', 'address', 'city', 'state', 'phone', 'owner'],
        },
        formUiSchema: defaultFormUiSchema,
      }}
      editFormProps={{
        formSchema: defaultFormSchema,
        formUiSchema: defaultFormUiSchema,
      }}
      detailsFormProps={{
        formSchema: {
          ...defaultFormSchema,
          required: ['name', 'address', 'city', 'state', 'phone', 'owner'],
        },
        formUiSchema: defaultFormUiSchema,
      }}
    />
  );
};

export default Organizations;
