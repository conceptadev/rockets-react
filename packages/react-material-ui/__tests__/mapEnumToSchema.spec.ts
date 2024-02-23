import { mapEnumToSchema } from '../src/components/SchemaForm/utils/mapEnumToSchema';
import { JSONSchema7TypeName } from 'json-schema';
import { AdvancedProperty } from '../src/components/SchemaForm/types';

describe('mapEnumToSchema', () => {
  it('should return an empty array if enumList is empty', () => {
    const type: JSONSchema7TypeName = 'string';
    const enumList = [];
    const advancedProperty: AdvancedProperty = {
      type: 'checkboxes',
      options: [],
    };

    const result = mapEnumToSchema(type, enumList, advancedProperty);

    expect(result).toEqual([]);
  });

  it('should map enumList to schema with string values', () => {
    const type: JSONSchema7TypeName = 'string';
    const enumList: string[] = ['a', 'b', 'c'];
    const advancedProperty: AdvancedProperty = {
      type: 'checkboxes',
      options: ['a', 'b', 'c'],
    };

    const expectedSchema = [
      { type: 'string', title: 'a', const: 'a' },
      { type: 'string', title: 'b', const: 'b' },
      { type: 'string', title: 'c', const: 'c' },
    ];

    const result = mapEnumToSchema(type, enumList, advancedProperty);

    expect(result).toEqual(expectedSchema);
  });

  it('should map enumList to schema with object values', () => {
    const type: JSONSchema7TypeName = 'string';
    const enumList: string[] = ['a', 'b', 'c'];
    const advancedProperty: AdvancedProperty = {
      type: 'radio',
      options: [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
        { value: 'c', label: 'Option C' },
      ],
    };

    const expectedSchema = [
      { type: 'string', title: 'Option A', const: 'a' },
      { type: 'string', title: 'Option B', const: 'b' },
      { type: 'string', title: 'Option C', const: 'c' },
    ];

    const result = mapEnumToSchema(type, enumList, advancedProperty);

    expect(result).toEqual(expectedSchema);
  });
});
