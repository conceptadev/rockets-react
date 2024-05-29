# validateForm

The _validateForm_ function serves as helper for custom validations on the SchemaForm. It can be passed as value to the _customValidate_ prop from SchemaForm. RJSF performs field validation by default based on [ajv property rules](https://ajv.js.org/json-schema.html), so this function can/should be used when the validation rules are out of the default schema form scope.

## Example

The following example describes the use of the function in a form validation scope:

```tsx
import { SchemaForm } from '@concepta/react-material-ui';
import Button from '@mui/material/Button';

<SchemaForm.Form
  schema={schema}
  advancedProperties={advancedProperties}
  validator={validator}
  onSubmit={onSubmit}
  widgets={widgets}
  formData={formData}
  onChange={({ formData }) => setFormData(formData)}
  customValidate={(formData, errors) =>
    validateForm(formData, errors, [
      {
        field: 'oldPassword',
        test: (value) => !value,
        message: 'Required field',
      },
      {
        field: 'newPassword',
        test: (value) => !value,
        message: 'Required field',
      },
      {
        field: 'confirmNewPassword',
        test: (value) => !value,
        message: 'Required field',
      },
      {
        field: 'confirmNewPassword',
        test: (value, formData) => value !== formData.newPassword,
        message: "Your passwords don't match. Please try again",
      },
    ])
  }
>
  <Button type="submit" variant="contained" sx={{ flex: 1, mr: 1 }}>
    Submit
  </Button>
</SchemaForm.Form>;
```

## Parameters

#### formData

The form data to be validated. This object contains the value of every field of the form, with every attribute of the object corresponding to the _property_ item name present on the schema.

**Type**: `object`

#### errors

Object containing the errors returned by the form validation when there's invalid fields.

**Type**: `object`

#### validationRules

Custom rules for field validations, with each object containing _field_, _test_ and _message_.

The _field_ attribute defines the name of the field validated by the rule.

The _test_ function forwards two parameters: the value of the current field and the current state of the form fields. If the return value of the test expresion is true, the tested field is considered invalid.

The _message_ parameter defines the message displayed when the value of the tested field is invalid.

**Type**: `object[]`
