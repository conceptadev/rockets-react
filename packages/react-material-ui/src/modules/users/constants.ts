import { RJSFSchema, UiSchema } from '@rjsf/utils';

import { CustomTextFieldWidget } from '../../styles/CustomWidgets';
import { FilterDetails } from 'components/submodules/Filter';
import { TableSchemaItem } from 'components/submodules/Table';

import { useTranslation } from '../../utils/i18n';

export const getTableHeaders = () => {
  const { t } = useTranslation();

  return [
    {
      id: 'id',
      label: 'ID',
    },
    {
      id: 'username',
      label: t('auth:username'),
    },
    {
      id: 'email',
      label: t('auth:email'),
    },
  ] as TableSchemaItem[];
};

export const getFormSchema = () => {
  const { t } = useTranslation();

  return {
    type: 'object',
    required: ['email', 'username'],
    properties: {
      email: {
        type: 'string',
        title: t('auth:email'),
        minLength: 3,
        format: 'email',
      },
      username: { type: 'string', title: t('auth:username'), minLength: 3 },
    },
  } as RJSFSchema;
};

export const uiSchema: UiSchema = {
  email: {
    'ui:widget': CustomTextFieldWidget,
  },
  username: {
    'ui:widget': CustomTextFieldWidget,
  },
};

export const getDefaultFilters = () => {
  const { t } = useTranslation();

  return [
    {
      id: 'id',
      label: 'ID',
      operator: 'eq',
      type: 'text',
      columns: 3,
    },
    {
      id: 'username',
      label: t('auth:username'),
      operator: 'contL',
      type: 'text',
      columns: 3,
    },
    {
      id: 'email',
      label: t('auth:email'),
      operator: 'contL',
      type: 'text',
      columns: 3,
    },
  ] as FilterDetails[];
};
