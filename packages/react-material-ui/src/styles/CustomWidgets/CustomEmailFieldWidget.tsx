import React from 'react';
import { WidgetProps } from '@rjsf/utils';
import CustomTextFieldWidget from './CustomTextFieldWidget';

const CustomEmailFieldWidget = (props: WidgetProps) => (
  <CustomTextFieldWidget {...props} type="email" />
);

export default CustomEmailFieldWidget;
