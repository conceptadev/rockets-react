import { FC, ReactNode } from 'react';
export declare type DropdownItem = {
    key: string;
    onClick: () => void;
    text?: string;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
};
declare type Props = {
    options: DropdownItem[];
    toggleDirection?: 'horizontal' | 'vertical';
};
declare const Dropdown: FC<Props>;
export default Dropdown;
