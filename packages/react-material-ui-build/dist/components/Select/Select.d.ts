import { FC } from 'react';
import { TextFieldProps } from '@mui/material/TextField';
export declare type SelectOptions = {
    label: string;
    value: unknown;
    disabled?: boolean;
};
declare type Props = {
    options: SelectOptions[];
};
declare const SelectWidget: FC<Props & TextFieldProps>;
export default SelectWidget;
