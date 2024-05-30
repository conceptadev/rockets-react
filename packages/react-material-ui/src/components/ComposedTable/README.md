# ComposedTable

The ComposedTable is a composition that includes the integration of Filter and Table components. The reason for this component is for the conjunction of table and filters to work in an opinionated way and for the settings from both to be handled by a single source, without the need of repetition when setting or getting data from localStorage.

Table and filter settings are saved on localStorage for maintaining the same configurations when reloading the page and/or returning to the page after navigating to another. Respectively, those settings are saved under _tableSettings_ and _filterSettings_ keys.

## Example

The following example describes the full composition that mounts the ComposedTable component:

```tsx
import { ComposedTable } from '@concepta/material-ui';

const {
  data,
  total,
  isPending,
  pageCount,
  tableQueryState,
  setTableQueryState,
} = useTable('users');

<ComposedTable
  rows={rows}
  headers={orderableHeaders}
  tableQueryState={tableQueryState}
  updateTableQueryState={setTableQueryState}
  total={total}
  pageCount={pageCount}
  data={data}
  isPending={isPending}
  key={JSON.stringify(orderableHeaders)}
  filters={[
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      columns: 3,
      onChange: (value) => null,
      onDebouncedSearchChange: (search) => null,
    },
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [],
      defaultValue: 'all',
      columns: 3,
      onChange: (value) => null,
    },
    {
      id: 'org',
      label: 'Organization',
      type: 'autocomplete',
      options: [],
      defaultValue: 'all',
      columns: 3,
      onChange: (value) => null,
      onDebouncedSearchChange: (search) => null,
    },
  ]}
  complementaryActions={
    <Box display="flex" gap={2}>
      <OrderableDropDown
        icon={<Settings />}
        list={orderableHeaders}
        setList={setOrderableHeaders}
      />
      <Button
        variant="contained"
        startIcon={<PersonAddAlt />}
        onClick={() => null}
        sx={{
          textWrap: 'nowrap',
        }}
      >
        Add User
      </Button>
    </Box>
  }
/>;
```

> The *OrderableDropDown* component allows the user to manage the order and appearance of the filter fields.

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

> The rest of the ComposedTable props extend from `Filter` and `Table`, so every prop from both of these is interchangeable with ComposedTable and can be passed to it.
