/// <reference types="react" />
import { TextProps } from 'interfaces';
export type FormLabelProps = {
    id?: string;
    name?: string;
    label?: string;
    required?: boolean;
    labelProps?: TextProps;
};
export declare const FormLabel: (props: FormLabelProps) => JSX.Element;
export default FormLabel;
