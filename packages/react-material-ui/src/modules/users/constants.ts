import { RJSFSchema, UiSchema } from '@rjsf/utils';
import { HeaderProps } from 'components/Table/types';
import { CustomTextFieldWidget } from '../../styles/CustomWidgets';
import { FilterDetails } from 'components/submodules/Filter';

export const headers: HeaderProps[] = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'fullName',
    label: 'Full name',
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
  required: ['fullName', 'email', 'username'],
  properties: {
    fullName: { type: 'string', title: 'Full Name' },
    email: { type: 'string', title: 'Email', minLength: 3, format: 'email' },
    username: { type: 'string', title: 'Username', minLength: 3 },
  },
};

const uiSchema: UiSchema = {
  email: {
    'ui:widget': CustomTextFieldWidget,
    'ui:disabled': true,
  },
  username: {
    'ui:widget': CustomTextFieldWidget,
    'ui:disabled': true,
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
    id: 'fullName',
    label: 'Full name',
    operator: 'contL',
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
