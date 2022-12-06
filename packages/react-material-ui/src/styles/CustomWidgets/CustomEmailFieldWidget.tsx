import React, { FC } from 'react';
import { WidgetProps } from '@rjsf/utils';
import CustomTextFieldWidget from './CustomTextFieldWidget';

const CustomEmailFieldWidget: FC<WidgetProps> = (props) => (
  <CustomTextFieldWidget {...props} type="email" />
);

export default CustomEmailFieldWidget;
