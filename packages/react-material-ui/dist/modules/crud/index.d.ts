import { PropsWithChildren, ReactNode } from 'react';
import { Order } from '../../components/Table/types';
import { TableProps as InnerTableProps } from '../../components/Table/Table';
import { StyleDefinition, TableSchemaItem, PaginationStyle } from '../../components/submodules/Table';
import { Search, CustomFilter, CustomSearch } from '../../components/Table/types';
import { FormSubmoduleProps } from '../../components/submodules/types/Form';
import { FilterDetails } from '../../components/submodules/Filter';
import { useCrudRoot, CrudContext, CrudContextProps, FilterValues } from './useCrudRoot';
interface TableProps {
    tableSchema: TableSchemaItem[];
    tableProps?: InnerTableProps;
    tableTheme?: StyleDefinition;
    hasAllOption?: boolean;
    hideActionsColumn?: boolean;
    reordable?: boolean;
    customFilter?: CustomFilter;
    customSearch?: CustomSearch;
    filters?: FilterDetails[];
    paginationStyle?: PaginationStyle;
    onDeleteSuccess?: (data: unknown) => void;
    onDeleteError?: (error: unknown) => void;
    mobileModalTitleSrc?: string;
    allowModalPreview?: boolean;
    order?: Order;
    orderBy?: string;
}
type FormProps = Pick<FormSubmoduleProps, 'formSchema' | 'formUiSchema' | 'onSubmit' | 'submitButtonTitle' | 'cancelButtonTitle' | 'hideCancelButton' | 'isDeleteButtonVisible' | 'customFooterContent' | 'customValidate' | 'prepareDataForForm' | 'submitDataFormatter' | 'onSuccess' | 'onError' | 'onDeleteSuccess' | 'onDeleteError' | 'sx'>;
interface Title {
    name: string;
    component: ReactNode;
}
export interface ModuleProps {
    title?: string | Title;
    hideBreadcrumb?: boolean;
    resource: string;
    tableProps: TableProps;
    formContainerVariation?: 'drawer' | 'modal';
    detailsFormProps?: PropsWithChildren<FormProps>;
    createFormProps?: PropsWithChildren<FormProps>;
    editFormProps?: PropsWithChildren<FormProps>;
    hideEditButton?: boolean;
    hideDeleteButton?: boolean;
    hideDetailsButton?: boolean;
    onFetchError?: (error: unknown) => void;
    filterCallback?: (filter: unknown) => void;
    externalSearch?: Search;
    navigate?: (path: string) => void;
    filterCacheKey?: string;
    tableCacheKey?: string;
    cacheApiPath?: string;
    enableTableRowSelection?: boolean;
    addButtonStartIcon?: ReactNode;
    addButtonEndIcon?: ReactNode;
    addButtonContent?: ReactNode;
    additionalFilterRowContent?: ReactNode;
}
declare const CrudModule: (props: ModuleProps) => JSX.Element;
export { useCrudRoot, CrudContext, CrudContextProps, FilterValues };
export default CrudModule;
