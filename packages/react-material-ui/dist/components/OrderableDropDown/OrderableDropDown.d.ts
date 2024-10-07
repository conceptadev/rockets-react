import React, { ReactNode } from 'react';
export interface ListItem {
    id: string;
    label: string;
    hide?: boolean;
    resetFilters?: () => void;
    [key: string]: unknown;
}
type StorageSettings = {
    key?: string;
    type: string;
    cacheApiPath?: string;
    onListUpdateFromCache: (data: Pick<ListItem, 'id' | 'label' | 'hide'>[]) => void;
};
export interface OrderableDropDownProps {
    list: ListItem[];
    icon?: ReactNode;
    minimumItems?: number;
    hasAllOption?: boolean;
    setList: React.Dispatch<React.SetStateAction<ListItem[]>>;
    text?: string;
    storage?: StorageSettings;
}
export declare const OrderableDropDown: ({ list, setList, minimumItems, hasAllOption, icon, text, storage, }: OrderableDropDownProps) => JSX.Element;
export {};
