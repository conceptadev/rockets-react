import React, { ReactNode } from 'react';
import { Checkbox } from '../../components/Checkbox';
import { WidgetProps } from '@rjsf/utils';

type CustomCheckboxWidgetProps = WidgetProps & {
  label: string | ReactNode;
};

const CustomCheckboxWidget = (props: CustomCheckboxWidgetProps) => (
  <Checkbox
    checked={props.value}
    label={props.label}
    onChange={(evt) => props.onChange(evt.target.checked)}
  />
);

export default CustomCheckboxWidget;
