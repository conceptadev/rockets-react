# SchemaForm

The SchemaForm component allows forms to be created based on schemas passed via props. Internally, it implements the [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/docs/) pattern.

## Example

The following example describes the full composition that mounts the SchemaForm component:

```tsx
import SchemaForm from '@concepta/material-ui';
import Button from '@mui/material/Button';
import validator from '@rjsf/validator-ajv6';

<SchemaForm.Form
  schema={{
    title: 'Register',
    description: 'A schema form example.',
    type: 'object',
    required: ['firstName', 'lastName', 'email', 'password'],
    properties: {
      firstName: {
        type: 'string',
        title: 'First name',
      },
      lastName: {
        type: 'string',
        title: 'Last name',
      },
      email: {
        type: 'string',
        title: 'Email',
      },
      password: {
        type: 'string',
        title: 'Password',
        minLength: 3,
      },
    },
  }}
  uiSchema={{
    email: {
      'ui:widget': 'email',
    },
    password: {
      'ui:widget': 'password',
    },
  }}
  validator={validator}
>
  <Button
    type="submit"
    variant="contained"
    disabled={isLoadingCreation || isLoadingEdit}
    sx={{ flex: 1, mr: 2 }}
  >
    Submit
  </Button>
</SchemaForm.Form>;
```

## Props

| Name | Type | Description | Optional |
| --- | --- | --- | --- |
| schema | `object` | Object that defines the structure of the form, containing information about field names, properties and formatting. Comprehensive guide available at the [schema docs](https://json-schema.org/learn/getting-started-step-by-step). | No
| validator | `object` | Validation helper for the form structure. _@rjsf/validator-ajvx_, provided by [ajv](https://github.com/ajv-validator/ajv), is generally used for this purpose. It is implemented on the form via the [HTML5 Validation](https://rjsf-team.github.io/react-jsonschema-form/docs/usage/validation#html5-validation). | Yes
| advancedProperties | `object` | Additional schema for fields that are out of the default _string_, _number_, _integer_, _object_, _array_, _boolean_ and _null_ set for the form schema. The field set for advanced properties contain the same types as the default one, but add other fields such as _email_, _password_, _select_, _radio_, _checkbox_, _checkboxes_ and _switch_. | Yes
| buttonTitle | `string` | Title for the form submit button. | Yes
| buttonComponent | `node` | Custom component for the form submit button. | Yes
| title | `string` | The title of the form, usually displayed on top of the fields. | Yes
| advancedPropertiesMapper | `object` | Custom mapper for the advanced properties. The default mapper for the form component is described below this table. | Yes

#### Advanced Properties Mapper default structure

```json
{
  "string": "string",
  "email": "string",
  "password": "string",
  "array": "array",
  "select": "string",
  "radio": "string",
  "checkbox": "boolean",
  "checkboxes": "array",
  "switch": "boolean"
}
```

> The rest of the SchemaForm props extend from [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/docs/).