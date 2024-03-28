import { FC } from 'react';
import { JSONSchema7 } from 'json-schema';
import { WidgetProps } from '@rjsf/utils';

import { AdvancedProperty } from '../types';
import {
  CustomCheckboxWidget,
  CustomCheckboxesWidget,
  CustomEmailFieldWidget,
  CustomPasswordFieldWidget,
  CustomRadioWidget,
  CustomSelectWidget,
  CustomSwitchWidget,
  CustomTextFieldWidget,
} from '../../../styles/CustomWidgets';

export const mapWidgetType = (
  propertyKey: string,
  schema: JSONSchema7,
  advancedProperties?: Record<string, AdvancedProperty>,
) => {
  const widgetTypes: Record<string, FC<WidgetProps>> = {
    string: CustomTextFieldWidget,
    email: CustomEmailFieldWidget,
    password: CustomPasswordFieldWidget,
    select: CustomSelectWidget,
    radio: CustomRadioWidget,
    checkbox: CustomCheckboxWidget,
    checkboxes: CustomCheckboxesWidget,
    switch: CustomSwitchWidget,
  };

  if (advancedProperties && propertyKey in advancedProperties) {
    return widgetTypes[advancedProperties[propertyKey].type];
  } else {
    return;
  }
};
