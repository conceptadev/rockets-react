# AuthModule

## Minimal configuration

The `AuthModule` component is imported from the `@concepta/react-material-ui` package, as follows:

```jsx
import { AuthModule } from '@concepta/react-material-ui';
```

For the module to work out of the box, a minimal configuration is required, laying the base for the main features of the module.

```jsx
<AuthModule route="signIn" />
```

With this implementation, a form with `username` and `password` fields should appear in the screen, performing a request for `API_URL/auth/login`, which can be modified by passing a value to the `signInRequestPath` prop. This is available only for the `signIn` route, as the request performed in this flow is made by a custom `doLogin` method, present in the `useAuth` hook imported from the `@concepta/react-auth-provider` package.

The request url and method can be modified passing both the `queryUri` and `queryMethod` props inside a `moduleProps` object, as follows:

```jsx
<AuthModule
  route="signIn"
  moduleProps={{
    queryUri: '/auth/sign-in',
    queryMethod: 'post',
  }}
/>
```

The `route` prop relates to which part of the authentication process this form represents, and can be one of `signIn`, `signUp`, `forgotPassword` and `resetPassword`.

## Form structure

The auth form has default fields for each route, but this form structure can be modified by passing a configuration object to the `formProps` object, i.e.:

```jsx
<AuthModule
  route="signIn"
  formProps={{
    overrideDefaults: true,
    formSchema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        username: { type: 'string', title: 'Email', format: 'email' },
        password: { type: 'string', title: 'Password', minLength: 8 },
      },
    },
  }}
/>
```

Passing a form schema as props will merge the default object with the custom one, so it's important to also pass the `overrideDefaults` prop, in a way that the form object will correspond only with what is passed as props.

The structure of auth forms in this module follows the `RJSFSchema`, imported from `@rjsf/utils`. These schemas represent a way to write input/format properties based on a JSON.

The `formUiSchema` prop describes how specific input(s) of the form should appear, and follows the structure of the `UiSchema` interface, also imported from `@rjsf/utils`.

```jsx
<AuthModule
  route="signIn"
  formProps={{
    overrideDefaults: true,
    formSchema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        username: { type: 'string', title: 'Email', format: 'email' },
        password: { type: 'string', title: 'Password', minLength: 8 },
      },
    },
    formUiSchema: {
      email: {
        'ui:widget': CustomTextFieldWidget,
      },
      password: {
        'ui:widget': CustomPasswordFieldWidget,
      },
    },
  }}
/>
```

## Custom validation

DESCRIBE CUSTOM VALIDATION HERE

## Action feedback

To use custom handlers for success/error on any auth form, the `onSuccess` and `onError` props can be passed to the `moduleProps` object, as follows:

```jsx
<AuthModule
  route="signIn"
  moduleProps={{
    onSuccess: () => window.alert('Success!'),
    onError: (error) => window.alert(error?.response?.data?.message),
  }}
/>
```

## Linking forms

The auth forms are linked to each other by links, and those can be controlled by passing the other pages urls as props, as listed below:

- `forgotPasswordPath`: represents a link to the Recover Password page;
- `signUpPath`: represents a link to the Sign Up page;
- `signInPath`: represents a link to the Sign In page.

Passing an empty string will hide the link each prop is related to.

No link prop is avalable for the Reset Password page, as this flow is made by a link sent by email.

## Other modifications

Some parts of the page like logo and title can be modified by passing custom props to the `moduleProps` object, as follows:

- `title`: modifies the title displayed in each page, overriding the default title that corresponds to the page;
- `submitButtonTitle`: changes the text displayed in the form's submit button;
- `logoSrc`: modifies the logo image displayed on top of the form container;
