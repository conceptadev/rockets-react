import React, { PropsWithChildren, ReactNode } from 'react';

import { useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';

import useTable from '../../components/Table/useTable';
import { Order } from '../../components/Table/types';
import { TableProps as InnerTableProps } from '../../components/Table/Table';
import Text from '../../components/Text';
import TableSubmodule, {
  StyleDefinition,
  TableSchemaItem,
  PaginationStyle,
} from '../../components/submodules/Table';
import DrawerFormSubmodule from '../../components/submodules/DrawerForm';
import ModalFormSubmodule from '../../components/submodules/ModalForm';
import {
  Search,
  CustomFilter,
  CustomSearch,
} from '../../components/Table/types';
import CrudRoot from './CrudRoot';
import { FormSubmoduleProps } from '../../components/submodules/types/Form';
import { FilterDetails } from '../../components/submodules/Filter';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

import {
  useCrudRoot,
  CrudContext,
  CrudContextProps,
  FilterValues,
} from './useCrudRoot';

import { useCrudControls, ControlsActionEnum } from './useCrudControls';

type Action = 'creation' | 'edit' | 'details' | null;

type SelectedRow = Record<string, unknown> | null;

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

type FormProps = Pick<
  FormSubmoduleProps,
  | 'formSchema'
  | 'formUiSchema'
  | 'onSubmit'
  | 'submitButtonTitle'
  | 'cancelButtonTitle'
  | 'hideCancelButton'
  | 'isDeleteButtonVisible'
  | 'customFooterContent'
  | 'customValidate'
  | 'prepareDataForForm'
  | 'submitDataFormatter'
  | 'onSuccess'
  | 'onError'
  | 'onDeleteSuccess'
  | 'onDeleteError'
  | 'sx'
>;

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
    order: props.tableProps.order,
    orderBy: props.tableProps.orderBy,
  });

  // Assign functions and data to CrudControls
  const {
    data,
    tableQueryState,
    setTableQueryState,
    pageCount,
    isPending,
    refresh,
  } = useTableReturn;
  const { dispatch } = useCrudControls();

  useEffect(() => {
    if (refresh && dispatch) {
      dispatch({
        type: ControlsActionEnum.ASSIGN_REFRESH_TABLE,
        payload: refresh,
      });
    }
  }, [tableQueryState]);

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: ControlsActionEnum.ASSIGN_TABLE_DATA, payload: data });
    }
  }, [data]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: ControlsActionEnum.ASSIGN_IS_FORM_VISIBLE,
        payload: isFormVisible,
      });
      dispatch({
        type: ControlsActionEnum.ASSIGN_SET_FORM_VISIBLE,
        payload: setFormVisible,
      });
    }
  }, [isFormVisible]);
  // End of CrudControls assignment

  const changeCurrentFormData = (direction: 'previous' | 'next') => {
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

  const { customFilter, customSearch, filters, ...tableSubmoduleProps } =
    props.tableProps;

  const titleName =
    typeof props.title === 'string' ? props.title : props.title?.name;

  return (
    <CrudRoot
      filters={filters}
      customFilter={customFilter}
      customSearch={customSearch}
      search={useTableReturn.search}
      updateSearch={useTableReturn.updateSearch}
      simpleFilter={useTableReturn.simpleFilter}
      updateSimpleFilter={useTableReturn.updateSimpleFilter}
      filterCallback={props.filterCallback}
      externalSearch={props.externalSearch}
      navigate={props.navigate}
    >
      <Box>
        {!props.hideBreadcrumb && (
          <Box mt={4}>
            <Breadcrumbs
              routes={[
                { href: '/', label: 'Home' },
                {
                  href: '#',
                  label: titleName || 'Table',
                },
              ]}
            />
          </Box>
        )}

        {typeof props.title === 'string' ? (
          <Text fontFamily="Inter" fontSize={20} fontWeight={800} mt={4} mb={4}>
            {props.title}
          </Text>
        ) : null}

        {!!props.title && typeof props.title != 'string'
          ? props.title.component
          : null}

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

        {enhancedFormProps && isFormVisible && (
          <FormComponent
            isVisible={isFormVisible}
            queryResource={props.resource}
            viewMode={drawerViewMode}
            formData={
              formProps?.prepareDataForForm
                ? formProps.prepareDataForForm(selectedRow)
                : selectedRow
            }
            onSuccess={(data) => {
              setSelectedRow(null);
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
            tableRowsProps={{
              currentIndex:
                (tableQueryState.page - 1) * tableQueryState.rowsPerPage +
                currentViewIndex +
                1,
              viewIndex: currentViewIndex + 1,
              rowsPerPage: tableQueryState.rowsPerPage,
              currentPage: tableQueryState.page,
              pageCount: useTableReturn.pageCount,
              total: useTableReturn.total,
            }}
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
