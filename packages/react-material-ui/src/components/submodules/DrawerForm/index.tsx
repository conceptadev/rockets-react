import React, { PropsWithChildren } from 'react';

import type { RJSFSchema, UiSchema, CustomValidator } from '@rjsf/utils';
import type { IChangeEvent, FormProps } from '@rjsf/core';

import {
  Box,
  Drawer,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Close as CloseIcon,
} from '@mui/icons-material';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import validator from '@rjsf/validator-ajv6';

import { SchemaForm, SchemaFormProps } from '../../../components/SchemaForm';

import { CustomTextFieldWidget } from '../../../styles/CustomWidgets';

type Action = 'creation' | 'edit' | null;

type DrawerFormSubmoduleProps = PropsWithChildren<
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
  queryResource: string;
  title?: string;
  formSchema?: RJSFSchema;
  viewMode?: Action | null;
  formUiSchema?: UiSchema;
  formData?: Record<string, unknown> | null;
  submitButtonTitle?: string;
  cancelButtonTitle?: string;
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
};

const DrawerFormSubmodule = (props: DrawerFormSubmoduleProps) => {
  const {
    queryResource,
    viewMode,
    widgets,
    formSchema,
    formUiSchema,
    formData,
    customValidate,
    submitButtonTitle,
    onClose,
    cancelButtonTitle,
    children,
    onSuccess,
    onError,
    onDeleteSuccess,
    onDeleteError,
    onPrevious,
    onNext,
    isLoading,
    viewIndex,
    rowsPerPage,
    ...otherProps
  } = props;

  const { post, patch, del } = useDataProvider();

  const { execute: createItem, isPending: isLoadingCreation } = useQuery(
    (data: Record<string, unknown>) =>
      post({
        uri: `/${queryResource}`,
        body: data,
      }),
    false,
    {
      onSuccess: onSuccess,
      onError: onError,
    },
  );

  const { execute: editItem, isPending: isLoadingEdit } = useQuery(
    (data: Record<string, unknown>) =>
      patch({
        uri: `/${queryResource}/${data.id}`,
        body: data,
      }),
    false,
    {
      onSuccess: onSuccess,
      onError: onError,
    },
  );

  const { execute: deleteItem, isPending: isLoadingDelete } = useQuery(
    (data: Record<string, unknown>) =>
      del({
        uri: `/${queryResource}/${data.id}`,
      }),
    false,
    {
      onSuccess: onDeleteSuccess,
      onError: onDeleteError,
    },
  );

  const handleFormSubmit = async (
    values: IChangeEvent<Record<string, unknown>>,
  ) => {
    const fields = values.formData || {};

    if (viewMode === 'creation') {
      await createItem(fields);
    }

    if (viewMode === 'edit') {
      await editItem(fields);
    }
  };

  const _widgets = {
    TextWidget: CustomTextFieldWidget,
    ...widgets,
  };

  return (
    <Drawer open={viewMode !== null} anchor="right">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        mt={2}
        ml={1}
      >
        <Typography variant="h5" sx={{ marginLeft: 3 }}>
          {viewMode === 'creation' ? 'Add Data' : 'Edit Data'}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: (theme) => theme.spacing(1),
            top: (theme) => theme.spacing(1),
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box padding={4} mb={2}>
        <SchemaForm.Form
          schema={{
            ...formSchema,
            required: formSchema?.required || [],
            properties: formSchema?.properties || {},
            title: '',
          }}
          uiSchema={{
            ...formUiSchema,
          }}
          validator={validator}
          onSubmit={handleFormSubmit}
          noHtml5Validate={true}
          showErrorList={false}
          formData={formData}
          widgets={_widgets}
          customValidate={customValidate}
          {...otherProps}
        >
          <>
            {children}
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent={
                viewMode === 'creation' ? 'flex-end' : 'space-between'
              }
              mt={4}
            >
              {viewMode !== 'creation' && (
                <Box display="flex" alignItems="center" gap={2}>
                  <IconButton
                    onClick={() => onPrevious(formData)}
                    disabled={isLoading}
                  >
                    <ChevronLeft sx={{ color: '#333' }} />
                  </IconButton>
                  <Typography>
                    {isLoading ? '' : `Row ${viewIndex}/${rowsPerPage}`}
                  </Typography>
                  <IconButton
                    onClick={() => onNext(formData)}
                    disabled={isLoading}
                  >
                    <ChevronRight sx={{ color: '#333' }} />
                  </IconButton>
                </Box>
              )}
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={2}
              >
                {viewMode !== 'creation' ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteItem(formData)}
                    sx={{ flex: 1 }}
                  >
                    {isLoadingDelete ? (
                      <CircularProgress sx={{ color: 'white' }} size={24} />
                    ) : (
                      cancelButtonTitle || 'Delete'
                    )}
                  </Button>
                ) : (
                  <Button variant="outlined" onClick={onClose} sx={{ flex: 1 }}>
                    {cancelButtonTitle || 'Close'}
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoadingCreation || isLoadingEdit}
                  sx={{ flex: 1 }}
                >
                  {isLoadingCreation || isLoadingEdit ? (
                    <CircularProgress sx={{ color: 'white' }} size={24} />
                  ) : (
                    submitButtonTitle || 'Save'
                  )}
                </Button>
              </Box>
            </Box>
          </>
        </SchemaForm.Form>
      </Box>
    </Drawer>
  );
};

export default DrawerFormSubmodule;
