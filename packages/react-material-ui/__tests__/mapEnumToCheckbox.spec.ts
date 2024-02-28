import { mapEnumToCheckbox } from '../src/components/SchemaForm/utils/mapEnumToCheckbox';
import { AdvancedProperty } from '../src/components/SchemaForm/types';

describe('mapEnumToCheckbox', () => {
  it('should return undefined if options are missing', () => {
    expect(
      mapEnumToCheckbox({
        type: 'checkboxes',
      }),
    ).toBeUndefined();
  });

  it('should return enum schema if options are all strings', () => {
    const advancedProperty: AdvancedProperty = {
      type: 'checkboxes',
      options: ['a', 'b', 'c'],
    };

    const expectedSchema = {
      type: 'string',
      enum: ['a', 'b', 'c'],
    };

    expect(mapEnumToCheckbox(advancedProperty)).toEqual(expectedSchema);
  });

  it('should return oneOf schema if options contain objects', () => {
    const advancedProperty: AdvancedProperty = {
      type: 'radio',
      options: [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
        { value: 'c', label: 'Option C' },
      ],
    };

    const expectedSchema = {
      type: 'string',
      enum: undefined,
      oneOf: [
        { const: 'a', title: 'Option A' },
        { const: 'b', title: 'Option B' },
        { const: 'c', title: 'Option C' },
      ],
    };

    expect(mapEnumToCheckbox(advancedProperty)).toEqual(expectedSchema);
  });
});
