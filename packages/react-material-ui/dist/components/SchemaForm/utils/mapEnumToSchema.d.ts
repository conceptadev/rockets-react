import { JSONSchema7, JSONSchema7Type, JSONSchema7TypeName } from 'json-schema';
import { AdvancedProperty } from '../types';
export declare const mapEnumToSchema: (type: JSONSchema7TypeName, enumList: JSONSchema7Type[], advancedProperty?: AdvancedProperty) => JSONSchema7['oneOf'];
