import { ReactNode } from 'react';

export type BasicType = string | number | boolean;

export type SimpleFilter = Record<string, BasicType | BasicType[] | null>;

export type UpdateSimpleFilter = (
  simpleFilter: SimpleFilter | null,
  resetPage?: boolean,
) => void;

export type Search = Record<string, any>;

export type HeaderProps = {
  disablePadding?: boolean;
  id: string;
  source?: string;
  label: string;
  width?: number;
  numeric?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  sortable?: boolean;
  key?: number | string;
  hide?: boolean;
};

export type CustomTableCell = {
  component?: ReactNode;
  value?: string | undefined;
  title?: string;
  sortableValue?: string | number;
};

export type RowProps = {
  id: string;
  [key: string]: string | number | CustomTableCell | undefined;
};

export type SelectedRows = {
  selectedRows: RowProps[];
};

export type CustomRowOptionsProps = {
  row: RowProps;
  close: () => void;
};

export type SimpleActionButton = {
  key: string;
  onClick: ({ selectedRows }: SelectedRows) => void;
  renderItem: ReactNode;
};

export type SimpleOptionButton = {
  key: string;
  onClick: (row: RowProps) => void;
  text?: string;
  icon?: ReactNode;
};

export enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

export type TableQueryStateProps = {
  order?: Order;
  orderBy?: string;
  rowsPerPage?: number;
  page?: number;
  simpleFilter?: SimpleFilter;
  search?: Search;
};

export type RenderRowFunction = (row: RowProps, labelId: string) => ReactNode;

export type TableResponseData = {
  data: unknown[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
};
