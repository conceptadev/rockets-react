import { JSONSchema7, JSONSchema7Type, JSONSchema7TypeName } from 'json-schema';
import { AdvancedProperty } from '../types';

export const mapEnumToSchema = (
  type: JSONSchema7TypeName,
  enumList: JSONSchema7Type[],
  advancedProperty?: AdvancedProperty,
): JSONSchema7['oneOf'] => {
  return enumList.map((enumListItem) => {
    const option = advancedProperty?.options?.find((option) => {
      if (typeof option === 'object') {
        return option.value === enumListItem;
      } else {
        return enumListItem === option;
      }
    });

    const title: string =
      typeof option === 'object'
        ? option.label
        : option
        ? option
        : typeof enumListItem === 'string'
        ? enumListItem
        : 'Invalid title';

    const value = typeof option === 'object' ? option.value : enumListItem;

    return { type, title, const: value };
  });
};
