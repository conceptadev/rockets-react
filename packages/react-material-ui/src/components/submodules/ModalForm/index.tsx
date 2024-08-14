import React, { PropsWithChildren } from 'react';

import type { RJSFSchema, UiSchema, CustomValidator } from '@rjsf/utils';
import type { IChangeEvent, FormProps } from '@rjsf/core';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import validator from '@rjsf/validator-ajv6';

import { SchemaForm, SchemaFormProps } from '../../../components/SchemaForm';
import { CustomTextFieldWidget } from '../../../styles/CustomWidgets';

type Action = 'creation' | 'edit' | 'details' | null;

type ModalFormSubmoduleProps = PropsWithChildren<
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
  title?: string;
  queryResource: string;
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
  currentPage?: number;
  pageCount?: number;
};

const ModalFormSubmodule = (props: ModalFormSubmoduleProps) => {
  const {
    queryResource,
    viewMode,
    widgets,
    onClose,
    formSchema,
    formUiSchema,
    formData,
    customValidate,
    submitButtonTitle,
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
    currentPage,
    pageCount,
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
    <Dialog open={viewMode !== null} maxWidth="md" fullWidth onClose={onClose}>
      <DialogTitle>
        {viewMode === 'creation'
          ? 'Add Data'
          : viewMode === 'edit'
          ? 'Edit Data'
          : 'View Data'}
      </DialogTitle>
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
      <DialogContent>
        <SchemaForm.Form
          schema={{
            ...formSchema,
            required: formSchema?.required || [],
            properties: formSchema?.properties || {},
            title: '',
          }}
          uiSchema={formUiSchema}
          validator={validator}
          onSubmit={handleFormSubmit}
          noHtml5Validate={true}
          showErrorList={false}
          formData={isLoading ? null : formData}
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
                    disabled={
                      isLoading || (currentPage === 1 && viewIndex === 1)
                    }
                  >
                    <ChevronLeft sx={{ color: '#333' }} />
                  </IconButton>
                  <Typography>
                    {isLoading ? '' : `Row ${viewIndex}/${rowsPerPage}`}
                  </Typography>
                  <IconButton
                    onClick={() => onNext(formData)}
                    disabled={
                      isLoading ||
                      (currentPage === pageCount && viewIndex === rowsPerPage)
                    }
                  >
                    <ChevronRight sx={{ color: '#333' }} />
                  </IconButton>
                </Box>
              )}
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                mt={2}
                gap={2}
              >
                {viewMode === 'creation' && (
                  <Button variant="outlined" onClick={onClose} sx={{ flex: 1 }}>
                    {cancelButtonTitle || 'Cancel'}
                  </Button>
                )}
                {viewMode === 'edit' && (
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
                )}
                {viewMode === 'details' && (
                  <Button variant="outlined" onClick={onClose} sx={{ flex: 1 }}>
                    {cancelButtonTitle || 'Close'}
                  </Button>
                )}
                {viewMode !== 'details' && (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={
                      isLoadingCreation || isLoadingEdit || isLoadingDelete
                    }
                    onClick={() => editItem(formData)}
                    sx={{ flex: 1 }}
                  >
                    {isLoadingCreation || isLoadingEdit ? (
                      <CircularProgress sx={{ color: 'white' }} size={24} />
                    ) : (
                      submitButtonTitle || 'Save'
                    )}
                  </Button>
                )}
              </Box>
            </Box>
          </>
        </SchemaForm.Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFormSubmodule;
