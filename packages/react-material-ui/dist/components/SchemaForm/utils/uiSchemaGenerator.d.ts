import { JSONSchema7 } from 'json-schema';
import { UiSchema } from '@rjsf/utils';
import { SchemaFormProps } from '../SchemaForm';
export declare const uiSchemaGenerator: (schema: JSONSchema7, advancedProperties: SchemaFormProps['advancedProperties']) => Record<string, UiSchema>;
