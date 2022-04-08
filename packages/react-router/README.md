# @rockets-react/react-router

Rockets Router package to handle app routeing system

## IMPORTANT

When building your Routing system, you need to remember these!

> This module only helps you to handle routing on your application. There is no magic, you are still responsible for
> maitaing the state of your app and navigate between the routes manually.

## Here is how it works

### This package will expose the following

- A Router component to wrapp all your app privates and publics routes
- Methods to make the routes navigation

!!! Important !!!

- You have to provide a isAuth boolean property, NotFound and Unauthorized components to Router component, so the Router will have a component to render when these situations happens.

## Examples

These are very rough examples. We intend to improve them ASAP.

### Simple User Login

```typescript
import {
  ProtectedRoute,
  PublicRoute,
  Router,
  useNavigate,
} from '@concepta/react-router';

const NotFound = () => {
  return <div>Not Found</div>;
};

const Unauthorized = () => {
  return <div>Unauthorized</div>;
};

const Home = () => {
  return <div>LOGGED IN!</div>;
};

const LoginForm = () => {
  const { doLogin, user } = useAuth();
  const navigateTo = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigateTo('/', { replace: true });
    }
  }, [user]);

  const onClickSignIn = async (user: string, password: string) => {
    doLogin({ email: user, password });
  };

  return <SimpleLoginForm onClickSignIn={onClickSignIn} />;
};

const AppWrapper: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router
      isAuth={!!user}
      NotFoundComponent={NotFound}
      UnauthorizedComponent={Unauthorized}
    >
      <ProtectedRoute path="/" Component={Home} />
      <PublicRoute path="/login" Component={LoginForm} />
    </Router>
  );
};
```
