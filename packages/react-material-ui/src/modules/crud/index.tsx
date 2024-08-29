import React, { PropsWithChildren, ReactNode } from 'react';

import type { RJSFSchema, UiSchema, CustomValidator } from '@rjsf/utils';

import { useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';

import useTable from '../../components/Table/useTable';
import { TableProps as InnerTableProps } from '../../components/Table/Table';
import Text from '../../components/Text';
import TableSubmodule, {
  StyleDefinition,
  TableSchemaItem,
  PaginationStyle,
} from '../../components/submodules/Table';
import DrawerFormSubmodule from '../../components/submodules/DrawerForm';
import ModalFormSubmodule from '../../components/submodules/ModalForm';
import { Search } from '../../components/Table/types';
import CrudRoot from './CrudRoot';
import { FilterDetails } from '../../components/submodules/Filter';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

import {
  useCrudRoot,
  CrudContext,
  CrudContextProps,
  FilterValues,
} from './useCrudRoot';

type Action = 'creation' | 'edit' | 'details' | null;

type SelectedRow = Record<string, unknown> | null;

interface TableProps {
  tableSchema: TableSchemaItem[];
  tableProps?: InnerTableProps;
  tableTheme?: StyleDefinition;
  hasAllOption?: boolean;
  hideActionsColumn?: boolean;
  reordable?: boolean;
  filters?: FilterDetails[];
  paginationStyle?: PaginationStyle;
  onDeleteSuccess?: (data: unknown) => void;
  onDeleteError?: (error: unknown) => void;
  mobileModalTitleSrc?: string;
  allowModalPreview?: boolean;
}

interface FormProps {
  formSchema?: RJSFSchema;
  formUiSchema?: UiSchema;
  submitButtonTitle?: string;
  cancelButtonTitle?: string;
  hideCancelButton?: boolean;
  customFooterContent?: ReactNode;
  customValidate?: CustomValidator;
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
  onDeleteSuccess?: (data: unknown) => void;
  onDeleteError?: (error: unknown) => void;
}

export interface ModuleProps {
  title?: string;
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

const CrudModule = (props: ModuleProps) => {
  const [drawerViewMode, setDrawerViewMode] = useState<Action>(null);
  const [selectedRow, setSelectedRow] = useState<SelectedRow>(null);
  const [currentViewIndex, setCurrentViewIndex] = useState<number>(0);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  const useTableReturn = useTable(props.resource, {
    callbacks: {
      onError: props.onFetchError,
    },
    navigate: props.navigate,
  });

  const changeCurrentFormData = (direction: 'previous' | 'next') => {
    const { data, tableQueryState, setTableQueryState, pageCount } =
      useTableReturn;

    const isPrevious = direction === 'previous';
    const isNext = direction === 'next';

    const isFirstItem = currentViewIndex === 0;
    const isLastItem = currentViewIndex === data.length - 1;

    if (
      (isPrevious && isFirstItem && tableQueryState.page === 1) ||
      (isNext && isLastItem && tableQueryState.page === pageCount)
    ) {
      return;
    }

    if (direction === 'previous') {
      if (isFirstItem && tableQueryState.page > 1) {
        setTableQueryState({
          ...tableQueryState,
          page: tableQueryState.page - 1,
        });
      }

      setCurrentViewIndex(isFirstItem ? data.length - 1 : currentViewIndex - 1);
    }

    if (direction === 'next') {
      if (isLastItem && tableQueryState.page < pageCount) {
        setTableQueryState({
          ...tableQueryState,
          page: tableQueryState.page + 1,
        });
      }

      setCurrentViewIndex(isLastItem ? 0 : currentViewIndex + 1);
    }
  };

  const FormComponent = useMemo(() => {
    switch (props.formContainerVariation) {
      case 'drawer':
        return DrawerFormSubmodule;
      case 'modal':
        return ModalFormSubmodule;
      default:
        return DrawerFormSubmodule;
    }
  }, [props.formContainerVariation]);

  const formProps = useMemo(() => {
    switch (drawerViewMode) {
      case 'creation':
        return props.createFormProps;
      case 'edit':
        return props.editFormProps;
      case 'details':
        return props.detailsFormProps;
      default:
        return props.createFormProps;
    }
  }, [
    drawerViewMode,
    props.createFormProps,
    props.detailsFormProps,
    props.editFormProps,
  ]);

  useEffect(() => {
    const { data } = useTableReturn;

    if (!data || !data.length) {
      return;
    }

    setSelectedRow(data[currentViewIndex] as SelectedRow);
  }, [useTableReturn.data, currentViewIndex]);

  // To prevent accidental overriding of the `onSuccess` callback
  // during props destructuring in the `FormComponent`,
  // we remove it from `formProps` and store it separately.
  const formOnSuccess = formProps?.onSuccess;
  const formOnDeleteSuccess = formProps?.onDeleteSuccess;

  const enhancedFormProps = { ...formProps };

  delete enhancedFormProps.onSuccess;
  delete enhancedFormProps.onDeleteSuccess;

  const { filters, ...tableSubmoduleProps } = props.tableProps;

  const { isPending, tableQueryState } = useTableReturn;

  return (
    <CrudRoot
      filters={filters}
      search={useTableReturn.search}
      updateSearch={useTableReturn.updateSearch}
      simpleFilter={useTableReturn.simpleFilter}
      updateSimpleFilter={useTableReturn.updateSimpleFilter}
      filterCallback={props.filterCallback}
      externalSearch={props.externalSearch}
      navigate={props.navigate}
    >
      <Box>
        <Box mt={4}>
          <Breadcrumbs
            routes={[
              { href: '/', label: 'Home' },
              { href: '#', label: props.title || 'Table' },
            ]}
          />
        </Box>

        {props.title ? (
          <Text fontFamily="Inter" fontSize={20} fontWeight={800} mt={4} mb={4}>
            {props.title}
          </Text>
        ) : null}

        <TableSubmodule
          queryResource={props.resource}
          onAction={(payload) => {
            setSelectedRow(payload.row);
            setDrawerViewMode(payload.action);
            setCurrentViewIndex(payload.index);
            setFormVisible(true);
          }}
          onAddNew={() => {
            setSelectedRow(null);
            setDrawerViewMode('creation');
            setCurrentViewIndex(0);
            setFormVisible(true);
          }}
          hideAddButton={!props.createFormProps}
          hideEditButton={!props.editFormProps || props.hideEditButton}
          hideDeleteButton={props.hideDeleteButton}
          hideDetailsButton={!props.detailsFormProps || props.hideDetailsButton}
          filterCallback={props.filterCallback}
          externalSearch={props.externalSearch}
          filterCacheKey={props.filterCacheKey}
          tableCacheKey={props.tableCacheKey}
          cacheApiPath={props.cacheApiPath}
          hasCheckboxes={props.enableTableRowSelection}
          addButtonStartIcon={props.addButtonStartIcon}
          addButtonEndIcon={props.addButtonEndIcon}
          addButtonContent={props.addButtonContent}
          additionalFilterRowContent={props.additionalFilterRowContent}
          {...useTableReturn}
          {...tableSubmoduleProps}
        />

        {enhancedFormProps && (
          <FormComponent
            isVisible={isFormVisible}
            title={props.title}
            queryResource={props.resource}
            viewMode={drawerViewMode}
            formData={selectedRow}
            onSuccess={(data) => {
              useTableReturn.refresh();
              setFormVisible(false);
              if (formOnSuccess) {
                formOnSuccess(data);
              }
            }}
            onDeleteSuccess={(data) => {
              useTableReturn.refresh();
              setFormVisible(false);
              if (formOnDeleteSuccess) {
                formOnDeleteSuccess(data);
              }
            }}
            onClose={() => setFormVisible(false)}
            onPrevious={() => changeCurrentFormData('previous')}
            onNext={() => changeCurrentFormData('next')}
            isLoading={isPending}
            viewIndex={currentViewIndex + 1}
            rowsPerPage={tableQueryState.rowsPerPage}
            currentPage={tableQueryState.page}
            pageCount={useTableReturn.pageCount}
            {...enhancedFormProps}
          >
            {enhancedFormProps.children}
          </FormComponent>
        )}
      </Box>
    </CrudRoot>
  );
};

export { useCrudRoot, CrudContext, CrudContextProps, FilterValues };

export default CrudModule;
