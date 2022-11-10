import { FC } from 'react';
import { RadioProps } from '@mui/material/Radio';
import { RadioGroupProps } from '@mui/material/RadioGroup';
export declare type RadioOptions = {
    label: string;
    value: unknown;
    disabled?: boolean;
};
declare type CustomRadioGroupProps = {
    options: RadioOptions[];
    label?: string;
    required?: boolean;
    row?: boolean;
    disabled?: boolean;
};
declare const Radio: FC<CustomRadioGroupProps & RadioGroupProps & RadioProps>;
export default Radio;
