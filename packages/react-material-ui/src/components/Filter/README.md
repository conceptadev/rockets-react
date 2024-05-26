# Filter

The Filter component is often displayed together with a Table, and renders a list of inputs which values can compose an url query accessed by the table or just change any state inside the page.

## Example

The following example describes the full composition that mounts the Filter component:

```tsx
import { Filter } from '@concepta/react-material-ui';

<Filter
  filters={[
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      columns: 5,
      defaultValue: defaultSearchTerm,
      value: nameFieldValue,
      onChange: (value) => setNameFieldValue(value),
      onDebouncedSearchChange: (search) => onDebouncedSearchChange(search),
    },
    {
      id: 'birthDate',
      label: 'Birth Date',
      type: 'date',
      columns: 5,
      value: dateFieldValue,
      onChange: (value) => setDateFieldValue(value),
      onDebouncedSearchChange: (search) => onDebouncedSearchChange(search),
    },
    {
      id: 'organization',
      label: 'Organization',
      type: 'autocomplete',
      options: orgOptions,
      defaultValue: 'all',
      columns: 2.5,
      onChange: (value) => onOrgChange(value),
    },
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: statusOptions,
      defaultValue: 'active',
      columns: 2.5,
      onChange: (value) => onStatusChange(value),
    },
  ]}
  complementaryActions={
    <Box display="flex" gap={2}>
      {tableHeadersList && setTableHeadersList ? (
        <OrderableDropDown
          icon={<Settings />}
          list={tableHeadersList || []}
          setList={setTableHeadersList}
        />
      ) : null}
      <Button
        variant="contained"
        startIcon={<PersonAddAlt />}
        onClick={onNewPersonClick}
        sx={{
          textWrap: 'nowrap',
        }}
      >
        New Person
      </Button>
    </Box>
  }
></Filter>;
```

## Props

#### filters

List of information and handlers that compose the filters grid.

**Type**: `object[]`

#### minimumFilters

Minimum quantity of items managed by the filter settings orderable list.

**Type**: `number`

#### hasAllOption

Flag that identifies if dropdown filters should display an _All_ option.

**Type**: `boolean`

#### children

Child nodes rendered inside the filter component.

**Type**: `node`

#### additionalGridItems

External nodes that can be displayed in the same grid of the inputs.

**Type**: `object[]`

#### complementaryActions

Nodes that can be displayed together with the inputs, often containing actions such as Clear or Search buttons.

**Type**: `node`

#### settingsId

String that identifies which item saved on localStorage corresponds to the current filter.

**Type**: `string`

The rest of the Filter props extend from [Material UI's `Grid`](https://mui.com/material-ui/api/grid/).
