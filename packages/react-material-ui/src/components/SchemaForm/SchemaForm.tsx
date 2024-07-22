'use client';

import React, { Fragment, ReactNode, ComponentType } from 'react';
import validator from '@rjsf/validator-ajv6';
import RJSFForm from '@rjsf/mui';
import Box from '@mui/material/Box';
import { RJSFSchema, SubmitButtonProps } from '@rjsf/utils';
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
  /**
   * Object that defines the structure of the form, containing information
   * about field names, properties and formatting. Comprehensive guide available
   * at the [schema docs](https://json-schema.org/learn/getting-started-step-by-step).
   */
  schema: RJSFSchema;
  /**
   * Validation helper for the form structure. `@rjsf/validator-ajvx` provided by
   * [ajv](https://github.com/ajv-validator/ajv), is generally used for this purpose.
   *
   * It is implemented on the form via the
   * [HTML5 Validation](https://rjsf-team.github.io/react-jsonschema-form/docs/usage/validation#html5-validation)
   */
  validator?: FormProps['validator'];
  /**
   * Additional schema for fields that are out of the default `string`, `number`,
   * `integer`, `object`, `array`, `boolean` and `null` set for the form schema.
   *
   * The field set for advanced properties contain the same types as the default
   * one, but add other fields such as `email`, `password`, `select`, `radio`,
   * `checkbox`, `checkboxes` and `switch`.
   */
  advancedProperties?: Record<string, AdvancedProperty>;
  /**
   * Title for the form submit button
   */
  buttonTitle?: string;
  /**
   * Custom component for the form submit button
   */
  buttonComponent?: ComponentType<SubmitButtonProps<any, RJSFSchema, any>>;
  /**
   * The title of the form, usually displayed on top of the fields
   */
  title?: ReactNode;
  /**
   * Custom mapper for the advanced properties.
   *
   * The default mapper for the form component is described
   * in the example below.
   *
   * The rest of the SchemaForm props extend from [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/docs/).
   *
   * @example
   * ```json
   * {
   *   "string": "string",
   *   "email": "string",
   *   "password": "string",
   *   "array": "array",
   *   "select": "string",
   *   "radio": "string",
   *   "checkbox": "boolean",
   *   "checkboxes": "array",
   *   "switch": "boolean"
   * }
   * ```
   */
  advancedPropertiesMapper?: AdvancedPropertiesMapper;
};

/**
 * The SchemaForm component allows forms to be created based
 * on schemas passed via props. Internally, it implements the
 * [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/docs/) pattern.
 *
 * @see {@link [react-jsonschema-form documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/)}
 * @param props - SchemaForm component props
 *
 * The following example describes the full composition that mounts the SchemaForm component:
 *
 * @example
 * ```tsx
 * import SchemaForm from '@concepta/material-ui';
 * import { Button } from '@mui/material';
 * import validator from '@rjsf/validator-ajv6';
 *
 * <SchemaForm.Form
 *   schema={{
 *     title: 'Register',
 *     description: 'A schema form example.',
 *     type: 'object',
 *     required: ['firstName', 'lastName', 'email', 'password'],
 *     properties: {
 *       firstName: {
 *         type: 'string',
 *         title: 'First name',
 *       },
 *       lastName: {
 *         type: 'string',
 *         title: 'Last name',
 *       },
 *       email: {
 *         type: 'string',
 *         title: 'Email',
 *       },
 *       password: {
 *         type: 'string',
 *         title: 'Password',
 *         minLength: 3,
 *       },
 *     },
 *   }}
 *   uiSchema={{
 *     email: {
 *       'ui:widget': 'email',
 *     },
 *     password: {
 *       'ui:widget': 'password',
 *     },
 *   }}
 *   validator={validator}
 * >
 *   <Button
 *     type="submit"
 *     variant="contained"
 *     disabled={isLoadingCreation || isLoadingEdit}
 *     sx={{ flex: 1, mr: 2 }}
 *   >
 *     Submit
 *   </Button>
 * </SchemaForm.Form>
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
              ...(props.buttonTitle && {
                'ui:submitButtonOptions': {
                  submitText: props.buttonTitle,
                },
              }),
            }}
            formData={mergeFormData(finalSchema, formData)}
            noHtml5Validate
            showErrorList={false}
            templates={{
              ArrayFieldTemplate,
              ObjectFieldTemplate,
              ...(props.buttonComponent && {
                ButtonTemplates: {
                  SubmitButton: props.buttonComponent,
                },
              }),
            }}
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
export const SchemaForm = { Form, Title, Button };
