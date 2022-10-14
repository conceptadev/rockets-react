import React, { FC } from 'react';
import Checkbox from '../../components/Checkbox';
import { WidgetProps } from '@rjsf/core';

const CustomCheckboxWidget: FC<WidgetProps> = (props) => (
  <Checkbox
    checked={props.value}
    label={props.label}
    onChange={(evt) => props.onChange(evt.target.checked)}
  />
);

export default CustomCheckboxWidget;
