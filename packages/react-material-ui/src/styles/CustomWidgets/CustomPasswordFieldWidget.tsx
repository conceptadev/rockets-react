import React, { FC } from 'react';
import { WidgetProps } from '@rjsf/utils';
import CustomTextFieldWidget from './CustomTextFieldWidget';

const CustomPasswordFieldWidget: FC<WidgetProps> = (props) => (
  <CustomTextFieldWidget {...props} type="password" />
);

export default CustomPasswordFieldWidget;
