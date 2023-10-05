import {
  JSONSchema7,
  JSONSchema7Definition,
  JSONSchema7TypeName,
} from 'json-schema';

import { AdvancedProperty } from '../types';
import { mapEnumToSchema } from './mapEnumToSchema';
import { mapEnumToCheckbox } from './mapEnumToCheckbox';

const fieldTypesMap: Record<string, JSONSchema7TypeName> = {
  string: 'string',
  email: 'string',
  password: 'string',
  array: 'array',
  select: 'string',
  radio: 'string',
  checkbox: 'boolean',
  checkboxes: 'array',
  switch: 'boolean',
};

export function mapAdvancedProperties(
  _schema?: JSONSchema7,
  _advancedProperties?: Record<string, AdvancedProperty>,
): JSONSchema7['properties'] {
  if (!_schema?.properties || typeof _schema?.properties !== 'object') return;

  const schemaEntries = Object.entries(_schema?.properties);

  const overridenProperties: [string, JSONSchema7Definition][] =
    schemaEntries.map(([key, value]) => {
      if (typeof value === 'boolean') return [key, value];

      const advancedProperty = _advancedProperties?.[key];

      const fieldType =
        advancedProperty && fieldTypesMap?.[advancedProperty?.type];

      if (!advancedProperty || !fieldType) return [key, value];

      let parsedSchemaAdvancedProperty: JSONSchema7 = {};

      if (advancedProperty.type === 'checkboxes') {
        parsedSchemaAdvancedProperty = {
          ...value,
          type: fieldType,
          uniqueItems: true,
          items: mapEnumToCheckbox(advancedProperty),
        };
      }

      if (value?.enum && ['select', 'radio'].includes(advancedProperty.type)) {
        parsedSchemaAdvancedProperty = {
          ...value,
          oneOf: mapEnumToSchema(fieldType, value.enum, advancedProperty),
        };
      }

      if (advancedProperty.type === 'array' && advancedProperty.properties) {
        parsedSchemaAdvancedProperty = {
          ...value,
          type: 'object',
          properties: mapAdvancedProperties(
            advancedProperty.properties,
            advancedProperty.advancedProperties,
          ),
        };
      }

      return [
        key,
        Object.keys(parsedSchemaAdvancedProperty).length > 0
          ? parsedSchemaAdvancedProperty
          : value,
      ];
    });

  return Object.fromEntries(overridenProperties);
}
