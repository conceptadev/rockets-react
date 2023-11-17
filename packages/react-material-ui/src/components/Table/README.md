# Table

## Structure

`Table.Root` is the highest components of the tree and holds the context to share state. It can function as either a controlled or uncontrolled component. When passing a `tableQueryState` to `Table.Root`, it indicates the intention to control the table's state. This is particularly helpful when managing data externally and requiring full control. `Table.Root` intelligently enforces the requirement of total, pageCount, and `updateTableQueryState` if any of these props are provided. In the absence of these props, the component remains uncontrolled, and the state is managed by the Table component.

```js
<Table.Root rows={customRows()} headers={headers}> // This works and the state is controlled by the component
```

```js
// This also works and it means we're controlling the state outside of the component
// If any of the additional props are passed, all others are required.
<Table.Root 
  rows={customRows()} 
  headers={headers} 
  tableQueryState={...} // I'm passing this, so every prop below are required
  updateTableQueryState={...}
  total={...}
  pageCount={...}
>
```

Instead of exposing a single Table component, we now expose each part of the Table component individually and integrate them using a custom hook called `useTableRoot` to share state.

While we provide out-of-the-box components, we utilize render props in `Table.BodyRows`  to manage pagination, sorting, filtering, and more. However, we still grant developers the flexibility to use their own components for row rendering.

```js
<Table.BodyRows
  renderRow={row => (
    <Table.BodyRow row={row} hasCheckboxes={false} hover={false}>
        <Table.BodyCell row={row} />
    </Table.BodyRow>
  )} 
/>
```

You can create custom components and use the `useTableRoot` hook to access the necessary data from the Table state.

```js
const MyCustomComponent = () => {
  const state = useTableRoot();

  return (...)
}
```

We now employ URL state for both manual pagination (server-side) and local pagination (client-side).
We offer a function called createTableStyles to facilitate customizing the table layout without the need to create extensive objects directly in JSX/TSX. This enhances code readability and simplifies style toggling.

```js
const tableTheme = createTableStyles({
  table: {
    height: '100%',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'auto',
  },

<Table.Root sx={tableTheme.root}>
<Table.Table stickyHeader variant="outlined" sx={tableTheme.table}>
```

## Hooks

`useTable` now uses the `useTableQueryState` hook, creating a state object to manage pagination, filtering, and sorting. Importantly, `useTable` is now decoupled from the Table component and can function independently. It implements the same interface for the query state. based on the It can receive an initial state, or if one is not provided, it will utilize the default `useTableQueryState` settings. It exposes the fetched data, the current state, and provides methods for updating the state.

Every component now includes JSDocs, and even some inner functions have JSDocs as well.

Full example

```js
const tableTheme = createTableStyles({
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
});

<Table.Root rows={customRows()} headers={headers} sx={tableTheme.root} >
   <TableContainer sx={tableTheme.tableContainer}>
      <Table.Table stickyHeader variant="outlined" sx={tableTheme.table}>
         <TableHead>
            <TableRow sx={tableTheme.tableRow}>
               <Table.HeaderCells sx={tableTheme.tableHeader} />
            </TableRow>
         </TableHead>
         <TableBody>
            <Table.BodyRows
               renderRow={row => (
                  <Table.BodyRow row={row} hasCheckboxes={false} hover={false}>
                     <Table.BodyCell row={row} />
                  </Table.BodyRow>
               )}
             />
         </TableBody>
      </Table.Table>
   </TableContainer>
   <Table.Pagination variant="outlined" />
</Table.Root>
```

## Loading

If a loading state is necessary in the table, the `isLoading` prop can be passed to the table rows, as follows:

```js
<Table.BodyRows isLoading={isLoading} />
```
