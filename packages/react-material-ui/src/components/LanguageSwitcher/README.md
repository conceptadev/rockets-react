# LanguageSwitcher

The purpose of the LanguageSwitcher component is to provide a way to change the current i18n language from outside of rockets, without the need to import the i18n dependencies and create a new method or component to do it every time this change is necessary. It's a custom `Select` that, by default, displays every language resource present in the rockets i18n instance. This list can be modified by passing a custom array as prop to the component.

## Example

The following example describes the full composition that mounts the LanguageSwitcher component:

```tsx
import { LanguageSwitcher } from '@concepta/material-ui';

<LanguageSwitcher />;
```

```tsx
import { LanguageSwitcher } from '@concepta/material-ui';

const options = ['pt-BR', 'en-US'] // this array can represent a custom list of languages

<LanguageSwitcher languages={options} />;
```

## Props

| Name | Type | Description | Optional |
| --- | --- | --- | --- |
| languages | `string[]` | Custom list of languages that the component should display. | Yes

> The rest of the Filter props extend from [Material UI's `Select`](https://mui.com/material-ui/api/select/).
