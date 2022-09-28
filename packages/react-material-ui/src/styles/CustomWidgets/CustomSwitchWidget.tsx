import React, { FC } from 'react';
import Switch from '../../components/Switch';
import { WidgetProps } from '@rjsf/core';

const CustomSwitchWidget: FC<WidgetProps> = (props) => (
  <Switch
    value={props.value}
    label={props.label}
    onChange={(evt) => props.onChange(evt.target.checked)}
  />
);

export default CustomSwitchWidget;
