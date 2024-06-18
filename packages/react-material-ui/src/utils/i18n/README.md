# Internationalization

A set of functions that can be used to localize the application that is using Rockets modules or components. From that set, `i18n`, `useTranslation` and `languages` are exported. Explanation of each one as follows:

## i18n

Localization object instance, imported from [i18next](https://www.i18next.com/). Since the packages in this repo are dealing with react components and contexts, the `react-i18next` and `i18next-browser-languagedetector` are also used.

With `react-i18next`, specific hooks and lifecycle methods can be used, providing a better integration with components.

From `i18next-browser-languagedetector`, the current language of the browser is detected and used as default when the app is initialized.

Further reference in the [documentation pages](https://react.i18next.com/latest/using-with-hooks).

## useTranslation

Imported from [react-i18next](https://react.i18next.com/), this hook provides (among other useful members), the `t` function, used inside components to identify translated strings, as well as rehydrate the app when translation configs are changed.

```tsx
import React from 'react';
import {
  TablePagination as MuiTablePagination,
  TablePaginationProps as MuiTablePaginationProps,
  useTheme,
} from '@mui/material';
import { useTableRoot } from './hooks/useTableRoot';

import { useTranslation } from '../../utils/i18n';

type TablePaginationProps = {
  variant: 'clean' | 'contained' | 'outlined';
} & Omit<
  MuiTablePaginationProps,
  'variant' | 'page' | 'rowsPerPage' | 'count' | 'onPageChange'
>;

export const TablePagination = ({
  variant,
  rowsPerPageOptions = [5, 10, 25],
  sx,
  ...rest
}: TablePaginationProps) => {
  const theme = useTheme();

  const { rows, tableQuery, total, handleChangePage, handleChangeRowsPerPage } =
    useTableRoot();

  const { rowsPerPage, page } = tableQuery;

  const { t } = useTranslation();

  return (
    <MuiTablePagination
      {...otherProps}
      labelRowsPerPage={`${t('table:rowsPerPage')}:`}
      labelDisplayedRows={({ from, to, count }) =>
        t('table:displayedRows', { from, to, count })
      }
    />
  );
};
```

In this case, the `labelRowsPerPage` and `labelDisplayedRows` are translated strings, so the `t` function is used, as well as the namespace where the string is inserted (using `table:` indicates that the string belongs to the `table` namespace).

## languages

An array of strings containing the languages present in the `resources` object passed to the `i18n` instance. Further documentation on resources available in the [documentation pages](https://www.i18next.com/overview/configuration-options#languages-namespaces-resources).

```tsx
import locales from './locales';

const resources = {
  'en-US': locales.en_US,
  'pt-BR': locales.pt_BR,
};
```

In this case, the languages array will contain `pt-BR` and `en-US`. If another member is added to the resources object, it will be exported as well, without the need to change the `languages` definition.

The `locales` object refers to another file in the same directory, structured as, for example:

```json
{
  "en-US": {
    "translation": {
      "Welcome to React": "Welcome to React and react-i18next"
    }
  },
  "pt-BR": {
    "translation": {
      "Welcome to React": "Bem vindo ao React e react-i18next"
    }
  }
}
```
