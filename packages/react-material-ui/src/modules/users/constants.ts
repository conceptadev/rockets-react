import { RJSFSchema, UiSchema } from '@rjsf/utils';
import { CustomTextFieldWidget } from '../../styles/CustomWidgets';
import { FilterDetails } from 'components/submodules/Filter';
import { TableSchemaItem } from 'components/submodules/Table';

export const headers: TableSchemaItem[] = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'username',
    label: 'Username',
  },
  {
    id: 'email',
    label: 'Email',
  },
];

const schema: RJSFSchema = {
  type: 'object',
  required: ['email', 'username'],
  properties: {
    email: { type: 'string', title: 'Email', minLength: 3, format: 'email' },
    username: { type: 'string', title: 'Username', minLength: 3 },
  },
};

const uiSchema: UiSchema = {
  email: {
    'ui:widget': CustomTextFieldWidget,
  },
  username: {
    'ui:widget': CustomTextFieldWidget,
  },
};

export const CREATE_EDIT_FORM = {
  formSchema: schema,
  formUiSchema: uiSchema,
};

export const DEFAULT_FILTERS: FilterDetails[] = [
  {
    id: 'id',
    label: 'ID',
    operator: 'eq',
    type: 'text',
    columns: 3,
  },
  {
    id: 'username',
    label: 'Username',
    operator: 'contL',
    type: 'text',
    columns: 3,
  },
  {
    id: 'email',
    label: 'Email',
    operator: 'contL',
    type: 'text',
    columns: 3,
  },
];
