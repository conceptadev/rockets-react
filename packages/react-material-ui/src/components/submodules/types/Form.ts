import { PropsWithChildren, ReactNode } from 'react';
import { RJSFSchema, UiSchema, CustomValidator } from '@rjsf/utils';
import { FormProps } from '@rjsf/core';

import { SchemaFormProps } from '../../../components/SchemaForm';

export type Action = 'creation' | 'edit' | 'details' | null;

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
  title?: string;
  formSchema?: RJSFSchema;
  viewMode?: Action | null;
  formUiSchema?: UiSchema;
  formData?: Record<string, unknown> | null;
  submitButtonTitle?: string;
  cancelButtonTitle?: string;
  hideCancelButton?: boolean;
  customFooterContent?: ReactNode;
  onClose?: () => void;
  customValidate?: CustomValidator;
  widgets?: FormProps['widgets'];
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
  onDeleteSuccess?: (data: unknown) => void;
  onDeleteError?: (error: unknown) => void;
  onPrevious?: (data: unknown) => void;
  onNext?: (data: unknown) => void;
  isLoading?: boolean;
  viewIndex?: number;
  rowsPerPage?: number;
  currentPage?: number;
  pageCount?: number;
};
