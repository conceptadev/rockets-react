import React, { FC } from 'react';
import Switch from '../../components/Switch';
import { WidgetProps } from '@rjsf/utils';

const CustomSwitchWidget: FC<WidgetProps> = (props) => (
  <Switch
    checked={props.value}
    label={props.label}
    onChange={(evt) => props.onChange(evt.target.checked)}
  />
);

export default CustomSwitchWidget;
