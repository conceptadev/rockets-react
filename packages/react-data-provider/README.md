# @rockets-react/data-provider

Rockets Data Access package to handle all requests needed by your application.

## IMPORTANT

When building your Data Access Layer, you need to remember these!

> This module only helps you to handle basic requests on your application. There is no magic, you are still responsible for
> providing correct midlewares to auth requests, handle responses and errors

## Here is how it works

### This package will expose the following

- A dataProvider object to use methods like post, get, find, delete, update

!!! Important !!!

- You have to provide api information to dataProvider make the requests correctly
- You have to provide utility funcions like getAccessToken, getNewToken (Refresh) so dataProvider can handle the requests correctly

## Examples

These are very rough examples. We intend to improve them ASAP.

### Simple User Login

```typescript
import dataProvider from '@concepta/data-provider';

const AppWrapper: React.FC = () => {
  const [token, setToken] = useState<string>();

  const doLogin = async (loginData: LoginParams) => {
    const token = await dataProvider.post({
      uri: '/auth/login',
      body: loginData,
    });

    setToken(token);
  };

  return (
    <AuthProvider>
      {token ? (
        <div>LOGGED IN!</div>
      ) : (
        <SimpleLoginForm onClickSignIn={doLogin} />
      )}
    </AuthProvider>
  );
};
```
