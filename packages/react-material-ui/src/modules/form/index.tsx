import React, { useMemo, useState } from 'react';

import { Box, Button, CircularProgress } from '@mui/material';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import validator from '@rjsf/validator-ajv6';

import type { IChangeEvent } from '@rjsf/core';

import Text from '../../components/Text';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ConfirmationModal from '../../components/submodules/ConfirmationModal';
import { SchemaForm } from '../../components/SchemaForm';
import { CustomTextFieldWidget } from '../../styles/CustomWidgets';

import { ModuleProps } from '../crud';

const FormModule = (props: ModuleProps) => {
  const [formData, setFormData] = useState<Record<string, unknown> | null>(
    null,
  );
  const [isConfirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);

  const [, resource, viewMode, id] = window.location.pathname.split('/');

  const formProps = useMemo(() => {
    switch (viewMode) {
      case 'new':
        return props.createFormProps;
      case 'edit':
        return props.editFormProps;
      case 'details':
        return props.detailsFormProps;
      default:
        return props.createFormProps;
    }
  }, [
    viewMode,
    props.createFormProps,
    props.detailsFormProps,
    props.editFormProps,
  ]);

  const {
    formSchema,
    formUiSchema,
    customValidate,
    submitButtonTitle,
    cancelButtonTitle,
    children,
    customFooterContent,
    hideCancelButton,
    onSuccess,
    onError,
    ...otherProps
  } = formProps;

  const { get, post, patch, del } = useDataProvider();

  useQuery(
    () =>
      get({
        uri: `/${resource}/${id}`,
      }),
    Boolean(id),
    {
      onSuccess: (data) => setFormData(data as Record<string, unknown>),
    },
  );

  const { execute: createItem, isPending: isLoadingCreation } = useQuery(
    (data: Record<string, unknown>) =>
      post({
        uri: `/${resource}`,
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
        uri: `/${resource}/${id}`,
        body: data,
      }),
    false,
    {
      onSuccess: onSuccess,
      onError: onError,
    },
  );

  const { execute: deleteItem, isPending: isLoadingDelete } = useQuery(
    () =>
      del({
        uri: `/${resource}/${id}`,
      }),
    false,
    {
      onSuccess: (data) => {
        if (onSuccess) {
          onSuccess(data);
        }
        window.history.back();
      },
      onError: onError,
    },
  );

  const handleFormSubmit = async (
    values: IChangeEvent<Record<string, unknown>>,
  ) => {
    const fields = values.formData || {};

    if (viewMode === 'new') {
      await createItem(fields);
    }

    if (viewMode === 'edit') {
      await editItem(fields);
    }
  };

  const _widgets = {
    TextWidget: CustomTextFieldWidget,
  };

  return (
    <Box>
      <Box mt={4}>
        <Breadcrumbs
          routes={[
            { href: '/', label: 'Home' },
            { href: '#', label: props.title || 'Table' },
          ]}
        />
      </Box>

      {props.title ? (
        <Text fontFamily="Inter" fontSize={20} fontWeight={800} mt={4} mb={4}>
          {props.title}
        </Text>
      ) : null}

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
        formData={formData}
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
          justifyContent="flex-start"
          mt={4}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            mt={2}
            gap={2}
          >
            {customFooterContent}
            {viewMode === 'new' && !hideCancelButton && (
              <Button
                variant="outlined"
                onClick={() => window.history.back()}
                sx={{ flex: 1 }}
              >
                {cancelButtonTitle || 'Cancel'}
              </Button>
            )}
            {viewMode === 'edit' && !hideCancelButton && (
              <Button
                variant="contained"
                color="error"
                onClick={() => setConfirmationModalOpen(true)}
                sx={{ flex: 1 }}
              >
                {isLoadingDelete ? (
                  <CircularProgress sx={{ color: 'white' }} size={24} />
                ) : (
                  cancelButtonTitle || 'Delete'
                )}
              </Button>
            )}
            {viewMode === 'details' && !hideCancelButton && (
              <Button
                variant="outlined"
                onClick={() => window.history.back()}
                sx={{ flex: 1 }}
              >
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
      </SchemaForm.Form>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        onConfirm={() => {
          setConfirmationModalOpen(false);
          deleteItem(formData);
        }}
      />
    </Box>
  );
};

export default FormModule;
