import { RJSFSchema, UiSchema } from '@rjsf/utils';
import { HeaderProps } from 'components/Table/types';
import { CustomTextFieldWidget } from '../../styles/CustomWidgets';

export const schema: RJSFSchema = {
  type: 'object',
  required: ['email', 'username'],
  properties: {
    email: { type: 'string', title: 'Email', minLength: 3, format: 'email' },
    username: { type: 'string', title: 'Username', minLength: 3 },
  },
};

export const headers: HeaderProps[] = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'username',
    label: 'Username',
  },
];

export const uiSchema: UiSchema = {
  formSchema: schema,
  formUiSchema: {
    email: {
      'ui:widget': CustomTextFieldWidget,
    },
    username: {
      'ui:widget': CustomTextFieldWidget,
    },
  },
};
