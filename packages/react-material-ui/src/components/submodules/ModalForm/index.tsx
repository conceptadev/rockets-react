import React from 'react';
import { IChangeEvent } from '@rjsf/core';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import validator from '@rjsf/validator-ajv6';

import { SchemaForm } from '../../../components/SchemaForm';
import { CustomTextFieldWidget } from '../../../styles/CustomWidgets';
import { FormSubmoduleProps } from '../types/Form';
import TableRowControls from '../TableRowControls';

const ModalFormSubmodule = (props: FormSubmoduleProps) => {
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
    isVisible,
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
    <Dialog open={isVisible} maxWidth="md" fullWidth onClose={onClose}>
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
          readonly={viewMode === 'details'}
          {...otherProps}
        >
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
              <TableRowControls
                isLoading={isLoading}
                currentIndex={viewIndex}
                rowsPerPage={rowsPerPage}
                isPreviousDisabled={
                  isLoading || (currentPage === 1 && viewIndex === 1)
                }
                isNextDisabled={
                  isLoading ||
                  (currentPage === pageCount && viewIndex === rowsPerPage)
                }
                onPrevious={() => onPrevious(formData)}
                onNext={() => onNext(formData)}
              />
            )}
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              mt={2}
              gap={2}
            >
              {props.customFooterContent}
              {viewMode === 'creation' && !props.hideCancelButton && (
                <Button variant="outlined" onClick={onClose} sx={{ flex: 1 }}>
                  {cancelButtonTitle || 'Cancel'}
                </Button>
              )}
              {viewMode === 'edit' && !props.hideCancelButton && (
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
              {viewMode === 'details' && !props.hideCancelButton && (
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
        </SchemaForm.Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFormSubmodule;
