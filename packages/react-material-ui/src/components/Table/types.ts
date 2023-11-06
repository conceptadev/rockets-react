import { ReactNode } from 'react';

export type HeadersProps = {
  disablePadding?: boolean;
  id: string;
  label: string;
  numeric?: boolean;
  textAlign?: 'left' | 'center' | 'right';
};

export type CustomTableCell = {
  sortableValue?: string | number;
  component: ReactNode;
};

export type RowsProps = {
  id: string;
  [key: string]: string | number | CustomTableCell;
};

export type SelectedRows = {
  selectedRows: RowsProps[];
};

export type CustomRowOptionsProps = {
  row: RowsProps;
  close: () => void;
};

export type SimpleActionButton = {
  key: string;
  onClick: ({ selectedRows }: SelectedRows) => void;
  renderItem: ReactNode;
};

export type SimpleOptionButton = {
  key: string;
  onClick: (row: RowsProps) => void;
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
