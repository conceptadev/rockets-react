import { JSONSchema7 } from 'json-schema';
import { AdvancedProperty } from '../types';
export type AdvancedProperties = Record<string, AdvancedProperty>;
export declare const mapAdvancedProperties: (_schema?: JSONSchema7, _advancedProperties?: AdvancedProperties) => JSONSchema7['properties'];
