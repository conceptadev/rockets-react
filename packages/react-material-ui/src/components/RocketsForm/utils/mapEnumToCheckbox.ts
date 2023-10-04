import { JSONSchema7Definition } from 'json-schema';

import { AdvancedProperty } from '../types';

export function mapEnumToCheckbox(
  advancedProperty: AdvancedProperty,
): JSONSchema7Definition | JSONSchema7Definition[] | undefined {
  if (!advancedProperty.options) return;

  const isEnum = advancedProperty.options.every(
    (option) => typeof option === 'string',
  );

  return {
    type: 'string',
    ...(isEnum
      ? { enum: advancedProperty.options }
      : {
          enum: undefined,
          oneOf: advancedProperty.options.map(
            (option) =>
              typeof option === 'object' && {
                const: option.value,
                title: option.label,
              },
          ),
        }),
  };
}
