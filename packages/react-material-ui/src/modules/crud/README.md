# CrudModule

## Minimal configuration

The `CrudModule` component is imported from the `@concepta/react-material-ui` package, as follows:

```jsx
import { CrudModule } from '@concepta/react-material-ui';
```

For the module to work out of the box, a minimal configuration is required, laying the base for the main features of the module.

```jsx
<CrudModule
  resource="users"
  title="Users"
  tableProps={{
    tableSchema: [
      { id: 'id', label: 'ID' },
      { id: 'email', label: 'Email' },
      { id: 'active', label: 'Status' },
    ],
  }}
/>
```

With this implementation, a paginated table should be visible in the screen, fetching data from the `API_URL/{resource}` endpoint.

A button with a gear icon should also appear above the table, displaying a list of selectable/draggable items when clicked. This list corresponds to the items passed in the `tableSchema` array and controls the appearance and order of the table columns, respectively. To hide this button and disable reordering of table columns, the `reordable` boolean prop can be passed as false in the `tableProps` object.

## Describing the minimal props

The `resource` prop relates to which API will be used for the CRUD actions, i.e. `/users` for fetching all users (it's important that the objects returned are included in a `data` array), `/users/{id}` for fetching/creating data related to a specific user, and so on.

If it's necessary to display a title for the page where the module is being implemented, the `title` string prop can be passed.

All configuration related to the module table is controlled by the `tableProps` object prop, and the only required value for this object is the `tableSchema` array, which controls what table columns will be displayed. Each object passed in this array have two required attributes:

- `id`: identifies which attribute of each row object should be displayed in this column;
- `label`: the name the column itself.

Besides that, other non-required values can be present in each object if further configuration is necessary:

- `source`?: string;
- `key`?: number | string;
- `disablePadding`?: boolean;
- `width`?: number;
- `numeric`?: boolean;
- `textAlign`?: 'left' | 'center' | 'right';
- `sortable`?: boolean;
- `hide`?: boolean;
- `format`?: (data: unknown) => string | number;
- `renderTableCell`?: (data: unknown, rowData: unknown) => CustomTableCell;

## Data fecthing feedback

By default, displaying valid data on the table is the success feedback for the fetching process, but nothing besides en empty table is displayed when there's an error getting the initial data. To have a proper way of feedback when that happens, the `onFetchError` prop can be passed, as follows:

```jsx
<CrudModule
  resource="users"
  title="Users"
  tableProps={{
    tableSchema: [
      { id: 'id', label: 'ID' },
      { id: 'email', label: 'Email' },
      { id: 'active', label: 'Status' },
    ],
  }}
  onFetchError={() => window.alert('Error fecthing data!')}
/>
```

If needed, the `error` argument can be passed to the function as a way to access the specific network error provided by the query.

## Delete action feedback

By default, only the `delete` button is visible, appearing as a trash can icon. By clicking on the delete button of an item, a request is performed to the `API_URL/{resource}/{id}` endpoint, but no feedback is displayed by default. To add custom handlers for success and error of this request, the `onDeleteSuccess` and `onDeleteError` function props can be passed to the `tableProps` object, as follows:

```jsx
<CrudModule
  resource="users"
  title="Users"
  tableProps={{
    tableSchema: [
      { id: 'id', label: 'ID' },
      { id: 'email', label: 'Email' },
      { id: 'active', label: 'Status' },
    ],
    onDeleteSuccess: () => window.alert('Item successfully deleted!'),
    onDeleteError: () => window.alert('Error deleting item!'),
  }}
/>
```

To overwrite this default and hide the delete button, the `hideDeleteButton` boolean prop can be passed to the `tableProps` object.

## Styling the table

To modify the theme/style of the module table, a `tableTheme` prop can be passed inside the `tableProps` object. Based on this prop, a set of table parts can be stylized:

- `root`: main table wrapper, enclosing the actual table and the pagination component;
- `tableContainer`: wrapper enclosing just the table;
- `table`: actual table element;
- `tableHeader`: table head container;
- `tableHeaderRow`: table head row container;
- `tableHeaderCell`: container for each table head row cell;
- `tableBodyRow`?: table body row container;
- `tableBodyCell`?: container for each table body cell;

## Filters

To filter table items, the `filters` prop can be passed to the `tableProps` object. This prop is an array of settings for filter inputs displayed above the table, and can have the following structure:

```jsx
<CrudModule
  resource="users"
  title="Users"
  tableProps={{
    tableSchema: [
      { id: 'id', label: 'ID' },
      { id: 'email', label: 'Email' },
      { id: 'active', label: 'Status' },
    ],
    filters: [
      {
        id: 'email',
        label: 'Email',
        type: 'text',
        operator: 'contL',
        columns: 3,
      },
      {
        id: 'active',
        label: 'Status',
        type: 'select',
        operator: 'eq',
        options: [
          { value: 'true', label: 'Active' },
          { value: 'false', label: 'Inactive' },
        ],
        columns: 3,
      },
      {
        id: 'role',
        label: 'Role',
        type: 'autocomplete',
        operator: 'eq',
        options: [
          { value: 'programmer', label: 'Programmer' },
          { value: 'manager', label: 'Manager' },
        ],
        columns: 3,
      },
    ],
  }}
/>
```

Each filter can have the following set of attributes:

- `id`: identifies which attribute of a row is filtered;
- `label`: the label of the filter input;
- `isLoading`: identifies if the input is in loading state;
- `columns`: number of columns occupied by the input in a grid of 12 columns;
- `size`: overall size of the input, small or medium;
- `operator`: string that describes how much of the input value should match the data value;
- `type`: the type of the filter input, one of text, autocomplete or select;
- `options`: array of options displayed in the autocomplete or select inputs.

## Forms

For CRUD actions such as creation and edit, the module utilizes a form that is displayed on a lateral drawer container by default. This container can be changed to a modal via the `formContainerVariation` prop, with value of `drawer` or `modal`, as follows:

```jsx
<CrudModule
  resource="users"
  title="Users"
  tableProps={{
    tableSchema: [
      { id: 'id', label: 'ID' },
      { id: 'email', label: 'Email' },
      { id: 'active', label: 'Status' },
    ],
  }}
  formContainerVariation="modal"
/>
```

The structure of CRUD forms in this module follows the `RJSFSchema`, imported from `@rjsf/utils`. These schemas represent a way to write input/format properties based on a JSON.

In the case of the CRUD module, a schema can be passed as props relating to each action form: `createFormProps`, `editFormProps` and `detailsFormProps`. The latter describes the Read action from CRUD, displaying the data of a table item in a disabled form instead of a new page.

The input structure and layout of each form is composed by a set of values passed inside the form props. Every form props object can have the following attributes:

```jsx
<CrudModule
  resource="users"
  title="Users"
  tableProps={{
    tableSchema: [
      { id: 'id', label: 'ID' },
      { id: 'email', label: 'Email' },
      { id: 'active', label: 'Status' },
    ],
  }}
  formContainerVariation="modal"
  createFormProps={{
    formSchema: {
      type: 'object',
      required: ['fullName', 'email', 'username'],
      properties: {
        fullName: { type: 'string', title: 'Full Name' },
        email: {
          type: 'string',
          title: 'Email',
          minLength: 3,
          format: 'email',
        },
        username: { type: 'string', title: 'Username', minLength: 3 },
      },
    },
    formUiSchema: {
      email: {
        'ui:widget': CustomTextFieldWidget,
        'ui:disabled': true,
      },
      username: {
        'ui:widget': CustomTextFieldWidget,
        'ui:disabled': true,
      },
    },
    submitButtonTitle: 'Submit',
    cancelButtonTitle: 'Cancel',
    onSuccess: (data) => window.alert(`${data.email} created successfully!`),
    onError: (error) => window.alert(error?.data?.message),
  }}
/>
```

The `formUiSchema` prop describes how specific input(s) of the form should appear, and follows the structure of the `UiSchema` interface, also imported from `@rjsf/utils`.

Feedback handlers can be passed as values to the `onSuccess` and `onError` props, having `data` and `error` arguments received directly from the query performed on each action.
