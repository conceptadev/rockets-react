import React, { FC, Fragment } from 'react';
import { Box, Button, Text } from '../../';
import { RJSFSchema, UiSchema, FormValidation, WidgetProps } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/mui';
import { JSONSchema7Definition, JSONSchema7TypeName } from 'json-schema';
import {
  CustomTextFieldWidget,
  CustomEmailFieldWidget,
  CustomPasswordFieldWidget,
  CustomCheckboxesWidget,
  CustomRadioWidget,
  CustomSelectWidget,
  CustomCheckboxWidget,
  CustomSwitchWidget,
  ArrayFieldTemplate,
} from '../../styles/CustomWidgets';

type FieldTypeTypes =
  | 'string'
  | 'email'
  | 'password'
  | 'array'
  | 'stringArray'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'checkboxes'
  | 'switch';

type SelectOption = {
  value: string;
  label: string;
};

type FieldType = {
  type: FieldTypeTypes;
  title?: string;
  description?: string;
  required?: boolean;
  options?: (SelectOption | string)[];
  fields?: Fields;
};

type Fields = Record<string, FieldType>;

type Properties =
  | {
      [key: string]: JSONSchema7Definition;
    }
  | undefined;

export type FormType = {
  fields: Fields;
  title?: string;
  submitButtonLabel?: string;
};

type Props = {
  form: FormType;
  initialData?: Record<string, any>;
  onSubmit?: (values: any) => any;
  validate?: (formData: any, errors: FormValidation) => FormValidation;
  onError?: (error: any) => any;
};

const SimpleForm: FC<Props> = (props) => {
  const { form, initialData, onSubmit, validate, onError } = props;
  const { fields } = form;

  const generateRequired = (_fields: Fields) => {
    const required: string[] = [];

    Object.keys(_fields).map((key) => {
      if (_fields[key].required) {
        required.push(key);
      }
    });

    return required;
  };
  const generateProperties: (_fields: Fields) => Properties = (
    _fields: Fields,
  ) => {
    const properties: Properties = {};

    const fieldTypes: Record<FieldTypeTypes, JSONSchema7TypeName> = {
      string: 'string',
      email: 'string',
      password: 'string',
      array: 'array',
      stringArray: 'array',
      select: 'string',
      radio: 'string',
      checkbox: 'boolean',
      checkboxes: 'array',
      switch: 'boolean',
    };

    Object.keys(_fields).map((key: string) => {
      const field = _fields[key];
      const fieldType: JSONSchema7TypeName = fieldTypes[field.type];

      const fieldProperties: JSONSchema7Definition = {};

      if (fieldType) {
        fieldProperties['type'] = fieldType;
      }

      if (field.title) {
        fieldProperties['title'] = field.title;
      }

      if (field.description) {
        fieldProperties['description'] = field.description;
      }

      if (field.options && field.type === 'checkboxes') {
        fieldProperties['items'] = {
          type: 'string',
          enum: field.options,
        };

        fieldProperties['uniqueItems'] = true;
      }

      if (['select', 'radio'].includes(field.type)) {
        field?.options?.map((opt, i) => {
          if (typeof opt === 'string') {
            if (!fieldProperties.enum) {
              fieldProperties.enum = [];
            }
            fieldProperties.enum[i] = opt;
          }

          if (typeof opt === 'object' && opt.value) {
            if (!fieldProperties.enum) {
              fieldProperties.enum = [];
            }
            if (!fieldProperties.enumNames) {
              fieldProperties.enumNames = [];
            }
            fieldProperties['enum'][i] = opt.value;
            fieldProperties['enumNames'][i] = opt.label;
          }
        });
      }

      if (field.type === 'stringArray') {
        fieldProperties['items'] = {
          type: 'string',
          title: field.title,
        };
      }

      if (field.type === 'array' && field.fields) {
        fieldProperties['items'] = {
          type: 'object',
          required: generateRequired(field.fields),
          properties: generateProperties(field.fields),
        };
      }

      properties[key] = fieldProperties;
    });

    return properties;
  };

  const schema: RJSFSchema = {
    type: 'object',
    required: generateRequired(fields),
    properties: generateProperties(fields),
  };

  const generateUiSchema: () => Record<string, UiSchema> = () => {
    const uiSchema: Record<string, UiSchema> = {};

    const widgetTypes: Record<string, FC<WidgetProps>> = {
      string: CustomTextFieldWidget,
      email: CustomEmailFieldWidget,
      password: CustomPasswordFieldWidget,
      select: CustomSelectWidget,
      radio: CustomRadioWidget,
      checkbox: CustomCheckboxWidget,
      checkboxes: CustomCheckboxesWidget,
      switch: CustomSwitchWidget,
    };

    Object.keys(fields).map((key) => {
      const field = fields[key];

      if (widgetTypes[field.type]) {
        uiSchema[key] = { 'ui:widget': widgetTypes[field.type] };
      }
    });

    return uiSchema;
  };

  const generateFormData = () => {
    const formData: Record<string, any> = {
      ...initialData,
    };

    Object.keys(fields).map((key) => {
      const field = fields[key];
      if (['stringArray', 'array'].includes(field.type)) {
        formData[key] = initialData?.[key] || [''];
      }
    });

    if (Object.keys(formData).length) {
      return formData;
    }

    return null;
  };

  return (
    <Fragment>
      {form.title && (
        <Text
          variant="h4"
          fontFamily="Inter"
          fontSize={24}
          fontWeight={800}
          mt={4}
          gutterBottom
        >
          {form.title}
        </Text>
      )}

      <Box>
        <Form
          schema={schema}
          uiSchema={generateUiSchema()}
          formData={generateFormData()}
          noHtml5Validate={true}
          showErrorList={false}
          onError={onError}
          onSubmit={onSubmit}
          templates={{ ArrayFieldTemplate }}
          customValidate={validate}
          validator={validator}
        >
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            {form.submitButtonLabel || 'Submit'}
          </Button>
        </Form>
      </Box>
    </Fragment>
  );
};

export default SimpleForm;
