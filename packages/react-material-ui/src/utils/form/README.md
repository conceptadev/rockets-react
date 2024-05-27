# validateForm

The _validateForm_ function serves as helper for custom validations on the SchemaForm. It can be passed as value to the _customValidate_ prop from SchemaForm.

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

The form data to be validated, submitted by the form itself.

**Type**: `object`

#### errors

Object containing the errors returned by the form validation when there's invalid fields.

**Type**: `object`

#### validationRules

Custom rules for field validations, with each object containing _field_, _test_ and _message_.

**Type**: `object[]`
