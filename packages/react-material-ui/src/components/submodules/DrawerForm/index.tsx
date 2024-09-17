import React, { useState, useMemo } from 'react';
import type { IChangeEvent } from '@rjsf/core';
import {
  Box,
  Drawer,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';

import { SchemaForm } from '../../../components/SchemaForm';
import { CustomTextFieldWidget } from '../../../styles/CustomWidgets';
import { FormSubmoduleProps } from '../types/Form';
import TableRowControls from '../TableRowControls';

const DrawerFormSubmodule = (props: FormSubmoduleProps) => {
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
    submitDataFormatter,
    onSuccess,
    onError,
    onDeleteSuccess,
    onDeleteError,
    onPrevious,
    onNext,
    isLoading,
    isVisible,
    sx,
    tableRowsProps,
    ...otherProps
  } = props;

  const { viewIndex, rowsPerPage, currentPage, pageCount } = tableRowsProps;

  const [fieldValues, setFieldValues] =
    useState<FormSubmoduleProps['formData']>(formData);

  const { post, patch, del } = useDataProvider();

  const { execute: createItem, isPending: isLoadingCreation } = useQuery(
    (data: Record<string, unknown>) =>
      post({
        uri: `/${queryResource}`,
        body: submitDataFormatter ? submitDataFormatter(data) : data,
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
        body: submitDataFormatter ? submitDataFormatter(data) : data,
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

  const handleFieldChange = async (
    values: IChangeEvent<Record<string, unknown>>,
  ) => {
    setFieldValues(values.formData);
  };

  const handleFormSubmit = async () => {
    if (viewMode === 'creation') {
      await createItem(fieldValues);
    }
    if (viewMode === 'edit') {
      await editItem(fieldValues);
    }
  };

  const _widgets = {
    TextWidget: CustomTextFieldWidget,
    ...widgets,
  };

  const title = () => {
    if (formSchema?.title) {
      return formSchema.title;
    }
    if (viewMode === 'creation') {
      return 'Add Data';
    }
    if (viewMode === 'edit') {
      return 'Edit Data';
    }
    return 'View Data';
  };

  const actionButtons = useMemo(() => {
    return (
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent={viewMode === 'creation' ? 'flex-end' : 'space-between'}
        id="Rockets-FormDrawerFooter"
        mt="auto"
      >
        {viewMode !== 'creation' && (
          <TableRowControls
            {...tableRowsProps}
            isLoading={isLoading}
            onPrevious={() => onPrevious()}
            onNext={() => onNext()}
          />
        )}
        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
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
              disabled={isLoadingCreation || isLoadingEdit || isLoadingDelete}
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
    );
  }, [
    isLoading,
    viewIndex,
    rowsPerPage,
    currentPage,
    pageCount,
    props.customFooterContent,
    viewMode,
    props.hideCancelButton,
    formData,
    isLoadingDelete,
    cancelButtonTitle,
    isLoadingCreation,
    isLoadingEdit,
    submitButtonTitle,
  ]);

  return (
    <Drawer
      open={isVisible}
      anchor="right"
      sx={sx}
      id="Rockets-FormDrawer"
      className="Rockets-FormDrawer"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        mt={2}
        ml={1}
        className="Rockets-FormDrawer-Title"
      >
        <Typography variant="h5" sx={{ marginLeft: 3, fontSize: '20px' }}>
          {title()}
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
      <Box
        padding={4}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          '& .rjsf': {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          },
        }}
        className="Rockets-FormDrawer-SchemaWrapper"
      >
        <SchemaForm.Form
          schema={{
            ...formSchema,
            required: formSchema?.required || [],
            properties: formSchema?.properties || {},
            title: '',
          }}
          uiSchema={{
            ...formUiSchema,
            'ui:submitButtonOptions': { norender: true },
          }}
          noHtml5Validate={true}
          showErrorList={false}
          formData={fieldValues}
          widgets={_widgets}
          customValidate={customValidate}
          readonly={viewMode === 'details'}
          onChange={handleFieldChange}
          onSubmit={handleFormSubmit}
          {...otherProps}
        >
          {children}
          {actionButtons}
        </SchemaForm.Form>
      </Box>
    </Drawer>
  );
};

export default DrawerFormSubmodule;
