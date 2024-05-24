# Filter

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
