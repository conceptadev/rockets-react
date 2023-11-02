'use client';

import React, { FC, Fragment, ReactNode } from 'react';
import validator from '@rjsf/validator-ajv6';
import RJSFForm from '@rjsf/mui';
import Box from '@mui/material/Box';
import { RJSFSchema } from '@rjsf/utils';
import { FormProps } from '@rjsf/core';

import { mapAdvancedProperties } from './utils/mapAdvancedProperties';
import { mergeFormData } from './utils/mergeFormData';
import { uiSchemaGenerator } from './utils/uiSchemaGenerator';
import { AdvancedPropertiesMapper, AdvancedProperty } from './types';
import { ArrayFieldTemplate } from '../../styles/CustomWidgets';
import Button from './Button';
import Title from './Title';
import { ObjectFieldTemplate } from '../../styles/CustomTemplates';

export type SchemaFormProps = Omit<FormProps, 'schema' | 'validator'> & {
  schema: RJSFSchema;
  validator?: FormProps['validator'];
  advancedProperties?: Record<string, AdvancedProperty>;
  buttonTitle?: string;
  buttonComponent?: ReactNode;
  title?: ReactNode;
  advancedPropertiesMapper?: AdvancedPropertiesMapper;
};

const Form: FC<SchemaFormProps> = ({
  uiSchema,
  schema,
  formData,
  advancedProperties,
  children,
  advancedPropertiesMapper = mapAdvancedProperties,
  ...props
}) => {
  const finalSchema: RJSFSchema = {
    ...schema,
    properties: advancedPropertiesMapper(schema, advancedProperties),
  };

  return (
    <Fragment>
      {schema && (
        <Box>
          <RJSFForm
            schema={finalSchema}
            uiSchema={{
              ...uiSchemaGenerator(finalSchema, advancedProperties),
              ...uiSchema,
            }}
            formData={mergeFormData(finalSchema, formData)}
            noHtml5Validate
            showErrorList={false}
            templates={{ ArrayFieldTemplate, ObjectFieldTemplate }}
            validator={validator}
            {...props}
          >
            {children}
          </RJSFForm>
        </Box>
      )}
    </Fragment>
  );
};

const SchemaForm = { Form, Title, Button };
export default SchemaForm;
