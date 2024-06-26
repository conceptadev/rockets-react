# @concepta/react-auth-provider

Rockets Auth package to handle all authentication needs of your application.

## IMPORTANT

When building your Auth system, you need to remember these!

> This module only helps you to handle auth on your application. There is no magic, you are still responsible for
> having a SignIn/Signup screen and maitaing the state and routes of your application.

## Here is how it works

### This package will expose the following

- A provider and a hook to access auth information like user data, tokens
- Methods to make the Login and Logout funcionalities

### Make sure you configured correctly the DataProvider before using the auth provider

- Add your baseUrl with the \<ClientProvider> or via ENV file with a variable named NEXT_PUBLIC_API_URL.

## Examples

These are very rough examples. We intend to improve them ASAP.

### Simple User Login

```typescript
import { AuthProvider, useAuth } from '@concepta/auth-provider';

const AppWrapper = () => {
  const { doLogin, user } = useAuth();

  const onClickSignIn = async (user: string, password: string) => {
    doLogin({ email: user, password });
  };

  return (
    <AuthProvider>
      {user ? (
        <div>LOGGED IN!</div>
      ) : (
        <SimpleLoginForm onClickSignIn={onClickSignIn} />
      )}
    </AuthProvider>
  );
};
```
