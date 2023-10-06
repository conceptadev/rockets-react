import { JSONSchema7 } from 'json-schema';
import { UiSchema } from '@rjsf/utils';
import { Props } from '..';
import { mapWidgetType } from './mapWidgetType';

export function uiSchemaGenerator(
  schema: JSONSchema7,
  advancedProperties: Props['advancedProperties'],
): Record<string, UiSchema> {
  let uiSchema: Record<string, UiSchema> = {};

  if (!schema?.properties || typeof schema.properties !== 'object')
    return uiSchema;

  Object.keys(schema?.properties).forEach(key => {
    const widgetType = mapWidgetType(key, schema, advancedProperties);
    if (widgetType) {
      uiSchema = { ...uiSchema, [key]: { 'ui:widget': widgetType } };
    }
  });

  return uiSchema;
}
