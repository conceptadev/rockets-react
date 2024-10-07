import { ReactNode } from 'react';
type TableColumnOrderableProps = {
    hasAllOption?: boolean;
    text?: string;
    icon?: ReactNode;
    orderableListCacheKey?: string;
    cacheApiPath?: string;
};
export declare const TableColumnOrderable: ({ hasAllOption, text, icon, orderableListCacheKey, cacheApiPath, }: TableColumnOrderableProps) => JSX.Element;
export {};
