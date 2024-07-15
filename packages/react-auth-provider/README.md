# @concepta/react-auth-provider

## Introduction

### Overview of the Package

`@concepta/react-auth-provider` is a React library designed to simplify the authentication process, used together with `@concepta/react-data-provider`. It provides an `AuthProvider` component and related hooks to manage user authentication, including login, logout, and token management.

### Features

- Easy integration with existing React applications
- Customizable authentication paths
- Token management (access and refresh tokens)
- Hooks for accessing authentication context
- Support for custom success and error handlers

## Getting Started

### Installation

To install `@concepta/react-auth-provider`, run the following command:

```bash
npm install @concepta/react-auth-provider
```

or with yarn:

```bash
yarn add @concepta/react-auth-provider
```

> Ensure that @concepta/react-data-provider is properly configured before using the auth provider.

## Components

### AuthProvider

The `AuthProvider` component is the core of the `@concepta/react-auth-provider` package. It wraps your application and provides authentication context to its children.

#### Props

- **children**: The components that will have access to the authentication context.
- **onSuccess**: (Optional) A callback function executed upon successful login. Receives the access token as an argument.
- **onError**: (Optional) A callback function executed if an error occurs during login.

#### How to use it

Wrap your app with the AuthProvider component

```jsx
<AuthProvider>
  <App />
</AuthProvider>
```

### Success / Error Handling

- Use the `onSuccess` prop to handle successful login events:
- Use the `onError` prop to handle errors during the login process:

```jsx
<AuthProvider
  onSuccess={(data) =>
    console.log('Logged in with accessToken and refreshToken:', data)
  }
  onError={(error) => console.error('Login Error:', error)}
>
  <App />
</AuthProvider>
```

#### Methods

##### `doLogin`

- **Description**: Initiates the login process using the provided login data. The `loginData` can be a `LoginParams` object or any custom object.
- **Parameters**:
  - `loginData`: An object containing optionals `username`, `password`, `loginPath`, and any other custom key-value pairs.
  - The `loginPath` will be used to fire the request to this path instead of the default `/auth/signin`
- **Example Usage**:

```jsx
const loginData = { username: 'user', password: 'pass' };
doLogin(loginData);
```

With custom parameters

```jsx
interface CustomLogin {
    email: string
    secret: string
    rememberMe: boolean
}

const customLoginData = { email: 'user@provider.com', secret: 'pass', rememberMe: true };
doLogin(customLoginData);
```

You can specify a custom login path in the `loginData` when calling `doLogin`:

```jsx
const loginData = {
  username: 'user',
  password: 'pass',
  loginPath: '/custom-login',
};
doLogin(loginData);
```

##### `doLogout`

- **Description**: Clears the authentication tokens from local storage and performs logout actions.

#### State

- **isPending** (boolean): Status of the auth request.
- **user** (object): Holds the user information.
- **setUser** (object) => void: Function to update the user information.
- **accessToken** (string): Stores the access token.
- **refreshToken** (string): Stores the refresh token.

##### `user`

- **Description**: Holds the current user information. Initially, it may be `undefined` until the user logs in.
- **Usage**: This state is used to store information about the authenticated user. It can be used in various parts of your application to display user-specific data or to conditionally render components based on the user's authentication status.

**Accessing User Information:**

```jsx
const { user } = useAuth();

return (
  <div>{user ? <p>Welcome, {user.username}</p> : <p>Please log in</p>}</div>
);
```

##### `setUser`

- **Description**: Function to update the `user` state.
- **Usage**: This function is used to update the `user` state with new information, typically after a successful login or when fetching user details from a backend service.

**Setting User Information After Login:**

In the `onSuccess` callback, you can set the user information:

```jsx
const onSuccess = (accessToken) => {
  // Fetch user information from the backend using the access token
  fetchUserDetails(accessToken).then((userDetails) => {
    setUser(userDetails);
  });
};

// Usage in AuthProvider
<AuthProvider onSuccess={onSuccess}>
  <App />
</AuthProvider>;
```
