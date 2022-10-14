import React, { FC, Fragment } from 'react';
import { Box, Button, Text } from '../../';
import { withTheme, UiSchema, FormValidation } from '@rjsf/core';
import { Theme } from '@rjsf/material-ui/v5';
import {
  JSONSchema7,
  JSONSchema7Definition,
  JSONSchema7TypeName,
} from 'json-schema';
import {
  CustomTextFieldWidget,
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

type FieldType = {
  type: FieldTypeTypes;
  title?: string;
  description?: string;
  required?: boolean;
  options?: string[];
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

  const Form = withTheme(Theme);

  const widgets = () => {
    return {
      TextWidget: CustomTextFieldWidget,
      CheckboxWidget: CustomCheckboxWidget,
      CheckboxesWidget: CustomCheckboxesWidget,
      RadioWidget: CustomRadioWidget,
      SelectWidget: CustomSelectWidget,
      switchWidget: CustomSwitchWidget,
    };
  };
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

      if (field.options && field.type != 'select') {
        fieldProperties['items'] = {
          type: 'string',
          enum: field.options,
        };

        fieldProperties['uniqueItems'] = true;
      }

      if (['select', 'radio'].includes(field.type)) {
        fieldProperties['enum'] = field.options;
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

  const schema: JSONSchema7 = {
    type: 'object',
    required: generateRequired(fields),
    properties: generateProperties(fields),
  };

  const generateUiSchema: () => Record<string, UiSchema> = () => {
    const uiSchema: Record<string, UiSchema> = {};

    const widgetTypes: Record<string, string> = {
      email: 'email',
      password: 'password',
      select: 'select',
      radio: 'radio',
      checkbox: 'checkbox',
      checkboxes: 'checkboxes',
      switch: 'switchWidget',
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
          widgets={widgets()}
          formData={generateFormData()}
          noHtml5Validate={true}
          showErrorList={false}
          onSubmit={onSubmit}
          ArrayFieldTemplate={ArrayFieldTemplate}
          validate={validate}
          onError={onError}
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
