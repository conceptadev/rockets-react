import React, { ReactNode, ComponentType } from 'react';
import { RJSFSchema, SubmitButtonProps } from '@rjsf/utils';
import { FormProps } from '@rjsf/core';
import { AdvancedPropertiesMapper, AdvancedProperty } from './types';
export type SchemaFormProps = Omit<FormProps, 'schema' | 'validator'> & {
    schema: RJSFSchema;
    validator?: FormProps['validator'];
    advancedProperties?: Record<string, AdvancedProperty>;
    buttonTitle?: string;
    buttonComponent?: ComponentType<SubmitButtonProps<any, RJSFSchema, any>>;
    title?: ReactNode;
    advancedPropertiesMapper?: AdvancedPropertiesMapper;
};
export declare const SchemaForm: {
    Form: ({ uiSchema, schema, formData, advancedProperties, children, advancedPropertiesMapper, ...props }: SchemaFormProps) => JSX.Element;
    Title: ({ children }: {
        children?: React.ReactNode;
    }) => JSX.Element;
    Button: ({ children }: {
        children?: React.ReactNode;
    }) => JSX.Element;
};
