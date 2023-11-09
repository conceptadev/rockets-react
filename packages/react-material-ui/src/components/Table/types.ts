import { ReactNode } from 'react';

export type HeaderProps = {
  disablePadding?: boolean;
  id: string;
  label: string;
  width?: number;
  numeric?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  sortable?: boolean;
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

export type Order = 'asc' | 'desc';

export type TableQueryStateProps = {
  order: Order;
  orderBy: string;
  rowsPerPage: number;
  page: number;
};

export type RenderRowFunction = (row: RowProps, labelId: string) => ReactNode;
