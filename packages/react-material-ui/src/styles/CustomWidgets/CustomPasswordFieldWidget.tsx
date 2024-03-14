import React from 'react';
import { WidgetProps } from '@rjsf/utils';
import CustomTextFieldWidget from './CustomTextFieldWidget';

const CustomPasswordFieldWidget = (props: WidgetProps) => {
  const { uiSchema } = props;

  const passwordStrengthConfig = uiSchema?.['ui:passwordStrengthConfig'];

  return (
    <CustomTextFieldWidget
      {...props}
      uiSchema={uiSchema}
      passwordStrengthConfig={passwordStrengthConfig}
      type="password"
    />
  );
};

export default CustomPasswordFieldWidget;
