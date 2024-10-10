import { ButtonProps } from '@mui/material/Button';
import { TypographyProps } from '@mui/material/Typography';
import { FormValidation } from '@rjsf/utils';
import { FormProps } from '@rjsf/core';
import { JSONSchema7 } from 'json-schema';
type FieldTypeTypes = 'string' | 'email' | 'password' | 'array' | 'stringArray' | 'select' | 'radio' | 'checkbox' | 'checkboxes' | 'switch';
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
    default?: JSONSchema7['default'];
    fields?: Fields;
};
type Fields = Record<string, FieldType>;
export type FormType = {
    fields: Fields;
    title?: string;
    submitButtonLabel?: string;
    titleTextProps?: TypographyProps;
    formProps?: FormProps;
    submitButtonProps?: ButtonProps;
};
type Props = {
    form: FormType;
    initialData?: Record<string, any>;
    onSubmit?: (values: any) => any;
    validate?: (formData: any, errors: FormValidation) => FormValidation;
    onError?: (error: any) => any;
};
declare const SimpleForm: ({ form, initialData, onSubmit, validate, onError, }: Props) => JSX.Element;
export default SimpleForm;
