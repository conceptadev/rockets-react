import { FC } from 'react';
import { JSONSchema7 } from 'json-schema';
import { WidgetProps } from '@rjsf/utils';
import { AdvancedProperty } from '../types';
export declare const mapWidgetType: (propertyKey: string, schema: JSONSchema7, advancedProperties?: Record<string, AdvancedProperty>) => FC<WidgetProps<any, import("@rjsf/utils").RJSFSchema, any>>;
