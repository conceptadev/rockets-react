import { PropsWithChildren, ReactNode } from 'react';
import { RJSFSchema, UiSchema, CustomValidator } from '@rjsf/utils';
import { FormProps } from '@rjsf/core';
import { DrawerProps } from '@mui/material';

import { SchemaFormProps } from '../../../components/SchemaForm';

export type Action = 'creation' | 'edit' | 'details' | null;

export type FormData = Record<string, unknown> | null;

export type TableRowsProps = {
  currentIndex: number;
  viewIndex: number;
  rowsPerPage: number;
  currentPage: number;
  pageCount: number;
  total: number;
};

export type FormSubmoduleProps = PropsWithChildren<
  Omit<
    SchemaFormProps,
    | 'schema'
    | 'uiSchema'
    | 'validator'
    | 'onSubmit'
    | 'noHtml5Validate'
    | 'showErrorList'
    | 'formData'
    | 'readonly'
    | 'customValidate'
  >
> & {
  isVisible: boolean;
  queryResource: string;
  formSchema?: RJSFSchema;
  viewMode?: Action | null;
  formUiSchema?: UiSchema;
  formData?: FormData;
  submitButtonTitle?: string;
  cancelButtonTitle?: string;
  hideCancelButton?: boolean;
  customFooterContent?: ReactNode | ((data: FormData) => ReactNode);
  onClose?: () => void;
  customValidate?: CustomValidator;
  widgets?: FormProps['widgets'];
  prepareDataForForm?: (data: FormData) => FormData;
  submitDataFormatter?: (data: FormData) => FormData;
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
  onDeleteSuccess?: (data: unknown) => void;
  onDeleteError?: (error: unknown) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  isLoading?: boolean;
  sx?: DrawerProps['sx'];
  tableRowsProps: TableRowsProps;
};
