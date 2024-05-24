# Filter

The Filter component is often displayed together with a Table, and renders a list of inputs which values can compose an url query accessed by the table or just change any state inside the page.

### Props

#### filters

list of information and handlers that compose the table search

#### additionalGridItems

external nodes that can be displayed in the same grid of the inputs

#### complementaryActions

nodes that can be displayed together with the inputs, often containing actions such as Clear or Search buttons

> The Filter props extend from the `Grid` component props, so every prop is interchangeable between those two.

## Example

The following example describes the full composition that mounts the Filter component:

```tsx
<Filter
  filters={[
    {
      id: 'dealer',
      label: 'Dealer or Representative Name',
      type: 'text',
      columns: 5,
      defaultValue: defaultSearchTerm,
      value: dealerFieldValue,
      onChange: (value) => setDealerFieldValue(value),
      onDebouncedSearchChange: (search) => onSearchChange(search),
    },
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: statusOptions,
      defaultValue: getStatusFromFilter(defaultStatus) ?? 'all',
      columns: 2.5,
      onChange: (value) => onStatusChange(getStatusValue(value)),
    },
    {
      id: 'products',
      label: 'Products',
      type: 'select',
      options: PRODUCT_SOLD_OPTIONS,
      defaultValue: defaultProduct ?? 'all',
      columns: 2.5,
      onChange: (value) => onProductChange(value as ProductCategoryEnum | null),
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
        onClick={onNewDealerClick}
        sx={{
          textWrap: 'nowrap',
        }}
      >
        New Dealer
      </Button>
    </Box>
  }
></Filter>
```
