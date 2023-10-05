import { JSONSchema7 } from 'json-schema';
import { SchemaFormProps } from '../SchemaForm';

export function mergeFormData(
  schema: JSONSchema7,
  formData: SchemaFormProps['formData'],
) {
  if (schema?.properties && typeof schema.properties === 'object') {
    const mergedFormData = {
      ...formData,
    };

    Object.keys(schema?.properties).map((key) => {
      const property = schema?.properties && schema.properties[key];
      if (
        property &&
        property !== true &&
        property.type !== undefined &&
        !Array.isArray(property.type) &&
        ['array'].includes(property.type)
      ) {
        mergedFormData[key] = mergedFormData?.[key] || [''];
      }
    });

    if (Object.keys(mergedFormData).length) {
      return mergedFormData;
    }
  }

  return null;
}
