'use client';

import React, { useEffect, useState, ReactNode } from 'react';

import { useTableRoot } from './hooks/useTableRoot';
import OrderableDropDown, { ListItem } from '../OrderableDropDown';

type TableColumnOrderableProps = {
  hasAllOption?: boolean;
  text?: string;
  icon?: ReactNode;
  settingsId?: string;
  cacheApiPath?: string;
};

export const TableColumnOrderable = ({
  hasAllOption,
  text,
  icon,
  settingsId,
  cacheApiPath,
}: TableColumnOrderableProps) => {
  const { headers, setHeaders } = useTableRoot();

  const [headerOrder, setHeaderOrder] = useState<ListItem[]>(
    headers.map((header) => ({ id: header.id, label: header.label })),
  );

  const handleListUpdateFromCache = (cacheList: ListItem[]) => {
    const newHeaders = cacheList.map((header) => {
      const originalHeader = headers.find(({ id }) => id === header.id);
      return { ...originalHeader, hide: header.hide };
    });
    setHeaderOrder(newHeaders);
  };

  useEffect(() => {
    const newOrderedHeaders = headerOrder.map((header) => {
      const originalHeader = headers.find((h) => h.id === header.id);
      return { ...originalHeader, hide: header.hide };
    });
    setHeaders(newOrderedHeaders);
  }, [headerOrder]);

  return (
    <OrderableDropDown
      hasAllOption={hasAllOption}
      list={headerOrder}
      setList={setHeaderOrder}
      icon={icon}
      text={text}
      storage={{
        type: 'table',
        key: settingsId,
        cacheApiPath: cacheApiPath,
        onListUpdateFromCache: handleListUpdateFromCache,
      }}
    />
  );
};
