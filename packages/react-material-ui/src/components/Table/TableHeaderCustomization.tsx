'use client';

import React, { useEffect, useState } from 'react';

import { useTableRoot } from './hooks/useTableRoot';
import OrderableDropDown, { ListItem } from '../OrderableDropDown';

export const TableHeaderCustomization = () => {
  const { headers, setHeaders } = useTableRoot();

  const [headerOrder, setHeaderOrder] = useState<ListItem[]>(
    headers.map((header) => ({ id: header.id, label: header.label })),
  );

  useEffect(() => {
    const newOrderedHeaders = headerOrder.map((header) => {
      const originalHeader = headers.find((h) => h.id === header.id);
      return { ...originalHeader, hide: header.hide };
    });
    setHeaders(newOrderedHeaders);
  }, [headerOrder]);

  return <OrderableDropDown list={headerOrder} setList={setHeaderOrder} />;
};
