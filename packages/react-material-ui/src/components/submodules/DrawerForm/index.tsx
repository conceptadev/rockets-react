import React from 'react';

import type { RJSFSchema, UiSchema } from '@rjsf/utils';
import type { IChangeEvent } from '@rjsf/core';

import { Box, Drawer, Button, CircularProgress } from '@mui/material';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import validator from '@rjsf/validator-ajv6';
import { toast } from 'react-toastify';

import SchemaForm from '../../../components/SchemaForm';

import { CustomTextFieldWidget } from '../../../styles/CustomWidgets';

import { defaultFormProps } from '../../../modules/crud/constants';

const widgets = {
  TextWidget: CustomTextFieldWidget,
};

type Action = 'creation' | 'edit' | 'details' | null;

interface DrawerFormSubmoduleProps {
  queryResource: string;
  title?: string;
  formSchema?: RJSFSchema;
  viewMode?: Action | null;
  formUiSchema?: UiSchema;
  formData?: Record<string, unknown> | null;
  submitButtonTitle?: string;
  cancelButtonTitle?: string;
  onClose?: () => void;
  onSubmitSuccess?: () => void;
  overrideDefaults?: boolean;
}

const DrawerFormSubmodule = (props: DrawerFormSubmoduleProps) => {
  const { post, patch } = useDataProvider();

  const { execute: createItem, isPending: isLoadingCreation } = useQuery(
    (data: Record<string, unknown>) =>
      post({
        uri: `/${props.queryResource}`,
        body: data,
      }),
    false,
    {
      onSuccess: () => {
        toast.success('Data successfully created.');

        if (props.onSubmitSuccess) {
          props.onSubmitSuccess();
        }
      },
      onError: () => toast.error('Failed to create data.'),
    },
  );

  const { execute: editItem, isPending: isLoadingEdit } = useQuery(
    (data: Record<string, unknown>) =>
      patch({
        uri: `/${props.queryResource}/${data.id}`,
        body: data,
      }),
    false,
    {
      onSuccess: () => {
        toast.success('Data successfully updated.');

        if (props.onSubmitSuccess) {
          props.onSubmitSuccess();
        }
      },
      onError: () => toast.error('Failed to edit data.'),
    },
  );

  const handleFormSubmit = async (
    values: IChangeEvent<Record<string, unknown>>,
  ) => {
    const fields = values.formData || {};

    if (props.viewMode === 'creation') {
      await createItem(fields);
    }

    if (props.viewMode === 'edit') {
      await editItem(fields);
    }
  };

  return (
    <Drawer open={props.viewMode !== null} anchor="right">
      <Box padding={4} mb={2}>
        <SchemaForm.Form
          schema={{
            ...defaultFormProps.formSchema,
            ...props.formSchema,
            required: props.overrideDefaults
              ? props.formSchema?.required || []
              : [
                  ...(defaultFormProps.formSchema.required || []),
                  ...(props.formSchema?.required || []),
                ],
            properties: props.overrideDefaults
              ? props.formSchema?.properties || {}
              : {
                  ...(defaultFormProps.formSchema.properties || {}),
                  ...(props.formSchema?.properties || {}),
                },
          }}
          uiSchema={{
            ...defaultFormProps.formUiSchema,
            ...props.formUiSchema,
          }}
          validator={validator}
          onSubmit={handleFormSubmit}
          noHtml5Validate={true}
          showErrorList={false}
          formData={props.formData}
          readonly={props.viewMode === 'details'}
          widgets={widgets}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mt={4}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={isLoadingCreation || isLoadingEdit}
              sx={{ flex: 1, mr: 1 }}
            >
              {isLoadingCreation || isLoadingEdit ? (
                <CircularProgress sx={{ color: 'white' }} size={24} />
              ) : (
                props.submitButtonTitle || 'Save'
              )}
            </Button>
            <Button
              variant="outlined"
              onClick={props.onClose}
              sx={{ flex: 1, ml: 1 }}
            >
              {props.cancelButtonTitle || 'Close'}
            </Button>
          </Box>
        </SchemaForm.Form>
      </Box>
    </Drawer>
  );
};

export default DrawerFormSubmodule;