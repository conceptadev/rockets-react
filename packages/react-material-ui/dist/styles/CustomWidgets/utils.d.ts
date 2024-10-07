import { WidgetProps } from '@rjsf/utils';
export declare const filterProps: (props: WidgetProps) => {
    id: string;
    value: any;
    required: boolean;
    disabled: boolean;
    readOnly: boolean;
    autoFocus: boolean;
    placeholder: string;
    onChange: (value: any, es?: import("@rjsf/utils").ErrorSchema<any>, id?: string) => void;
    label: string;
    hiddenLabel: any;
    maxLength: any;
    type: any;
};
