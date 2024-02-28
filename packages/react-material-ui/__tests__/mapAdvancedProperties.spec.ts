import {
  mapAdvancedProperties,
  AdvancedProperties,
} from '../src/components/SchemaForm/utils/mapAdvancedProperties';
import { JSONSchema7 } from 'json-schema';

describe('mapAdvancedProperties', () => {
  it('should return undefined if schema properties are missing or not an object', () => {
    expect(mapAdvancedProperties()).toBeUndefined();
    expect(mapAdvancedProperties({})).toBeUndefined();
    expect(mapAdvancedProperties({ properties: undefined })).toBeUndefined();
  });

  it('should return the original properties if advanced properties are missing or not defined', () => {
    const schema: JSONSchema7 = {
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
      },
    };

    expect(mapAdvancedProperties(schema)).toEqual(schema.properties);
  });

  it('should handle checkboxes type', () => {
    const schema: JSONSchema7 = {
      properties: {
        options: { type: 'array' },
      },
    };

    const advancedProperties: AdvancedProperties = {
      options: { type: 'checkboxes', options: ['a', 'b', 'c'] },
    };

    const expectedSchema = {
      options: {
        type: 'array',
        uniqueItems: true,
        items: {
          type: 'string',
          enum: ['a', 'b', 'c'],
        },
      },
    };

    expect(mapAdvancedProperties(schema, advancedProperties)).toEqual(
      expectedSchema,
    );
  });

  it('should handle select type with enum', () => {
    const schema: JSONSchema7 = {
      properties: {
        color: { type: 'string', enum: ['red', 'green', 'blue'] },
      },
    };

    const advancedProperties: AdvancedProperties = {
      color: { type: 'select' },
    };

    const expectedSchema = {
      color: {
        type: 'string',
        enum: ['red', 'green', 'blue'],
        oneOf: [
          { type: 'string', const: 'red', title: 'red' },
          { type: 'string', const: 'green', title: 'green' },
          { type: 'string', const: 'blue', title: 'blue' },
        ],
      },
    };

    expect(mapAdvancedProperties(schema, advancedProperties)).toEqual(
      expectedSchema,
    );
  });

  it('should handle radio type with enum', () => {
    const schema: JSONSchema7 = {
      properties: {
        console: { type: 'string', enum: ['playstation', 'xbox', 'nintendo'] },
      },
    };

    const advancedProperties: AdvancedProperties = {
      console: { type: 'radio' },
    };

    const expectedSchema = {
      console: {
        type: 'string',
        enum: ['playstation', 'xbox', 'nintendo'],
        oneOf: [
          { type: 'string', const: 'playstation', title: 'playstation' },
          { type: 'string', const: 'xbox', title: 'xbox' },
          { type: 'string', const: 'nintendo', title: 'nintendo' },
        ],
      },
    };

    expect(mapAdvancedProperties(schema, advancedProperties)).toEqual(
      expectedSchema,
    );
  });

  it('should handle array type with advanced properties', () => {
    const schema: JSONSchema7 = {
      properties: {
        items: { type: 'array' },
      },
    };

    const advancedProperties: AdvancedProperties = {
      items: {
        type: 'array',
        properties: {
          name: { type: 'string' },
          age: { type: 'number' },
        },
      },
    };

    const expectedSchema = {
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'number' },
        },
      },
    };

    expect(mapAdvancedProperties(schema, advancedProperties)).toEqual(
      expectedSchema,
    );
  });
});
