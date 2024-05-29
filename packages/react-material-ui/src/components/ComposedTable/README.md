# ComposedTable

The ComposedTable is a composition that includes the integration of Filter and Table components. The reason for this component is for the conjunction of table and filters to work in an opinionated way and for the settings from both to be handled by a single source, without the need of repetition when setting or getting data from localStorage.

## Example

The following example describes the full composition that mounts the ComposedTable component:

```tsx
import { ComposedTable } from '@concepta/material-ui';

const { data, isPending } = useTable('user');

<ComposedTable
  tableTheme={createTableStyles({
    table: {
      height: '100%',
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      overflow: 'auto',
    },
    tableHeader: {
      ...theme.typography.caption,
      lineHeight: 1,
      fontWeight: 500,
      color: theme.palette.grey[500],
    },
    tableRow: {
      backgroundColor: '#F9FAFB',
      textTransform: 'uppercase',
    },
    tableContainer: {
      flex: 1,
    },
  })}
  headers={[
    {
      id: 'fullName',
      label: 'Name',
    },
    {
      id: 'status',
      label: 'Status',
    },
  ]}
  data={data}
  isPending={isPending}
  filters={[
    {
      id: 'fullName',
      label: 'Name',
      type: 'text',
      columns: 6,
      defaultValue: defaultSearchTerm,
      value: nameFieldValue,
      onChange: (value) => setNameFieldValue(value),
      onDebouncedSearchChange: (search) => onSearchChange(search),
    },
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: statusOptions,
      defaultValue: 'all',
      columns: 6,
      onChange: (value) => onStatusChange(value),
    },
  ]}
/>;
```

## Props

#### data

The list of objects to be rendered via table rows. Usually this prop is returned by the `useTable` hook.

**Type**: `object[]`

#### isPending

Identifier for the loading state of the component. Usually this prop is returned by the `useTable` hook.

**Type**: `boolean`

#### tableTheme

Custom styling for each table part, following the [sx](https://mui.com/system/getting-started/the-sx-prop/) pattern. The default styling for the table is the _outline_ variant.

**Type**: `object`

> The rest of the ComposedTable props extend from `Filter` and `TableRootProps` (imported from Table.Root), so every prop from both of these is interchangeable with ComposedTable and can be passed to it.
