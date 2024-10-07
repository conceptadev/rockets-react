import { ReactNode } from 'react';
import { WidgetProps } from '@rjsf/utils';
type CustomCheckboxWidgetProps = WidgetProps & {
    label: string | ReactNode;
};
declare const CustomCheckboxWidget: (props: CustomCheckboxWidgetProps) => JSX.Element;
export default CustomCheckboxWidget;
