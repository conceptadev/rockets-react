'use client';

import dynamic from 'next/dynamic';

const CrudModule = dynamic(
  () => import('@concepta/react-material-ui/dist/modules/crud'),
  { ssr: false },
);

import { CustomSelectWidget } from '@concepta/react-material-ui/dist/styles/CustomWidgets';

const getMaskedPhone = (text: string) => {
  const numericInput = text.replace(/\D/g, '');
  const truncatedInput = numericInput.slice(0, 10);
  const phoneNumberFormat = /^(\d{3})?(\d{3})?(\d{0,4})?$/;
  const formattedNumber = truncatedInput.replace(
    phoneNumberFormat,
    (_, p1, p2, p3) => {
      const formattedGroups = [p1 && `(${p1})`, p2 && ` ${p2}`, p3 && `-${p3}`];
      return formattedGroups.filter(Boolean).join('');
    },
  );

  return formattedNumber;
};

const Organizations = () => {
  return (
    <CrudModule
      resource="api/organizations"
      formContainerVariation="modal"
      title="Organization management"
      tableProps={{
        overrideDefaults: true,
        tableSchema: [
          { id: 'id', label: 'ID' },
          { id: 'name', label: 'Name' },
          { id: 'address', label: 'Address' },
          { id: 'city', label: 'City' },
          { id: 'state', label: 'State' },
          {
            id: 'phone',
            label: 'Phone',
            format: (row: Record<string, string>) => getMaskedPhone(row.phone),
          },
          {
            id: 'owner',
            label: 'Owner',
            format: (row: Record<string, Record<string, string>>) =>
              `${row.owner.firstName} ${row.owner.lastName}`,
          },
          {
            id: 'creationDate',
            label: 'Creation Date',
            format: (row: Record<string, string>) =>
              new Date(row.creationDate).toDateString(),
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
      formProps={{
        overrideDefaults: true,
        formSchema: {
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
          required: ['name', 'address', 'city', 'state', 'phone', 'owner'],
        },
        formUiSchema: {
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
        },
      }}
    />
  );
};

export default Organizations;
