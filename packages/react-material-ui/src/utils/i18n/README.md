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

Further reference in the [documentation pages](https://react.i18next.com/latest/usetranslation-hook).

## reactI18n

The current i18n instance. Contains the same attributes and methods from the `i18n` object returned from the `useTranslation` hook, but accessible from outside of react components.

## isInitialized

Boolean that indicates if the i18n instance was initialized and the language resources loaded.

## appendStrings

Appends a new set of strings to a language resource.

### Parameters

| Name | Type | Description |
| --- | --- | --- |
| lng | `string` | The name of the language that will have the strings appended. |
| ns | `string` | Namespace to which the strings will belong. |
| resources | `object` | The object containing string and their correspondent values. |

> The `ns` parameter should receive `translation` when no specific namespace is needed, since it's the default namespace of i18n instances.

```tsx
"use client";

import { useEffect } from "react";
import { AuthModule, i18n } from "@concepta/react-material-ui";
import Box from "@mui/material/Box";

const LoginPage = () => {
  const { t } = i18n.useTranslation();

  useEffect(() => {
    i18n.appendStrings("en-US", "translation", { appended: "Appended String" });
  }, []);

  return (
    <Box>
      <AuthModule route="signIn" />
      <Box sx={{ marginLeft: "16px" }}>
        <p>{t("appended")}</p>
      </Box>
    </Box>
  );
};

export default LoginPage;
```

## addLanguage

Adds a new language to the i18n resource list.

### Parameters

| Name | Type | Description |
| --- | --- | --- |
| lng | `string` | The name of the language that will have the strings appended. |
| resources | `object` | The object containing string and their correspondent values. |

```tsx
"use client";

import { useEffect } from "react";
import {
  AuthModule,
  LanguageSwitcher,
  i18n,
} from "@concepta/react-material-ui";
import Box from "@mui/material/Box";

const fr_FR = {
  auth: {
    signIn: "Se connecter",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    email: "E-mail",
    newPassword: "Nouveau mot de passe",
    confirmNewPassword: "Confirmer le nouveau mot de passe",
    signUp: "S'inscrire",
    forgotPassword: "Récupérer mot de passe",
    resetPassword: "Réinitialiser le mot de passe",
    forgotPasswordCTA: "Mot de passe oublié?",
    submit: "Envoyer",
    signInCTA: "Vous avez déjà un compte? Se connecter",
    signUpCTA: "Pas de compte? S'inscrire",
  },
  actions: {
    save: "Sauver",
    close: "Conclure",
    search: "Recherche",
    submit: "Soumettre",
  },
};

const LoginPage = () => {
  const { t } = i18n.useTranslation();

  useEffect(() => {
    i18n.addLanguage("fr-FR", "translation", fr_FR);
  }, []);

  return (
    <Box>
      <AuthModule route="signIn" />
      <LanguageSwitcher sx={{ marginLeft: "16px", marginRight: "16px" }} />
    </Box>
  );
};

export default LoginPage;
```

Further reference in the [`addResourceBundle` documentation pages](https://www.i18next.com/overview/api#addresourcebundle).
