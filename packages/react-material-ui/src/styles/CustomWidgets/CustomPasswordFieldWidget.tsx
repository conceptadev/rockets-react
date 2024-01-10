import React from 'react';
import { WidgetProps } from '@rjsf/utils';
import CustomTextFieldWidget from './CustomTextFieldWidget';

const CustomPasswordFieldWidget = (props: WidgetProps) => (
  <CustomTextFieldWidget {...props} type="password" />
);

export default CustomPasswordFieldWidget;
