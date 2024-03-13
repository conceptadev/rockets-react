'use client';

import React, { FC } from 'react';
import { Table as RocketsTable } from '../src';
import { RowProps, HeaderProps } from '../src/components/Table/types';
import useTable from '../src/components/Table/useTable';
import { TableBody, TableContainer, TableHead, TableRow } from '@mui/material';

interface Props {
  headers: HeaderProps[];
  hasCheckboxes?: boolean;
}

const TableAssembledUncontrolled: FC<Props> = ({ headers, hasCheckboxes }) => {
  const { data, total, pageCount, tableQueryState, setTableQueryState } =
    useTable('user', {
      rowsPerPage: 5,
    });

  return (
    <RocketsTable.Root
      rows={data as RowProps[]}
      headers={headers}
      total={total}
      pageCount={pageCount}
      tableQueryState={tableQueryState}
      updateTableQueryState={setTableQueryState}
    >
      <TableContainer>
        <RocketsTable.Table>
          <TableHead>
            <TableRow>
              {hasCheckboxes && <RocketsTable.HeaderCheckbox />}
              <RocketsTable.HeaderCells />
            </TableRow>
          </TableHead>
          <TableBody>
            {!hasCheckboxes ? (
              <RocketsTable.BodyRows />
            ) : (
              <RocketsTable.BodyRows
                renderRow={(row, labelId) => (
                  <RocketsTable.BodyRow row={row} key={row.id}>
                    <RocketsTable.BodyCheckboxes row={row} labelId={labelId} />
                    <RocketsTable.BodyCell row={row} />
                  </RocketsTable.BodyRow>
                )}
              />
            )}
          </TableBody>
        </RocketsTable.Table>
        <RocketsTable.Pagination variant="clean" />
      </TableContainer>
    </RocketsTable.Root>
  );
};

export default TableAssembledUncontrolled;
