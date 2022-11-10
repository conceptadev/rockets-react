import { FC } from 'react';
import { FormValidation } from '@rjsf/utils';
declare type FieldTypeTypes = 'string' | 'email' | 'password' | 'array' | 'stringArray' | 'select' | 'radio' | 'checkbox' | 'checkboxes' | 'switch';
declare type SelectOption = {
    value: string;
    label: string;
};
declare type FieldType = {
    type: FieldTypeTypes;
    title?: string;
    description?: string;
    required?: boolean;
    options?: (SelectOption | string)[];
    fields?: Fields;
};
declare type Fields = Record<string, FieldType>;
export declare type FormType = {
    fields: Fields;
    title?: string;
    submitButtonLabel?: string;
};
declare type Props = {
    form: FormType;
    initialData?: Record<string, any>;
    onSubmit?: (values: any) => any;
    validate?: (formData: any, errors: FormValidation) => FormValidation;
    onError?: (error: any) => any;
};
declare const SimpleForm: FC<Props>;
export default SimpleForm;
