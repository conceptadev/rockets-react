'use client';

import React, { Fragment, ReactNode } from 'react';
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

/**
 * SchemaForm component props.
 */
export type SchemaFormProps = Omit<FormProps, 'schema' | 'validator'> & {
  /** JSON schema for the form */
  schema: RJSFSchema;
  /** Validator function for the form */
  validator?: FormProps['validator'];
  /** Advanced properties for custom configurations */
  advancedProperties?: Record<string, AdvancedProperty>;
  /** Title for the submit button */
  buttonTitle?: string;
  /** Custom button component */
  buttonComponent?: ReactNode;
  /** Custom title component */
  title?: ReactNode;
  /** Mapper function for advanced properties */
  advancedPropertiesMapper?: AdvancedPropertiesMapper;
};

/**
 * The Form component is a wrapper around the React JSON Schema Form library,
 * customized with additional features such as advanced properties mapping,
 * custom UI schema generation, and form data merging.
 *
 * @param props - SchemaForm component props
 *
 * @example
 * ```tsx
 * <Form
 *   schema={mySchema}
 *   formData={myFormData}
 *   advancedProperties={myAdvancedProperties}
 * >
 *   <Button type="submit">Submit</Button>
 * </Form>
 * ```
 */
const Form = ({
  uiSchema,
  schema,
  formData,
  advancedProperties,
  children,
  advancedPropertiesMapper = mapAdvancedProperties,
  ...props
}: SchemaFormProps) => {
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

/**
 * SchemaForm component is a compound component that includes Form, Title, and Button.
 * It serves as an entry point for using the customized form components.
 */
const SchemaForm = { Form, Title, Button };
export default SchemaForm;
