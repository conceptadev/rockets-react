# @rockets-react/data-provider

## Overview

Rockets Data Access is a library for React applications that simplifies API interactions by integrating with Axios, managing authentication tokens and providing custom hooks for handling asynchronous requests and state. It enhances code maintainability and reliability with type safety, centralized configuration, and built-in token management, making it easier to handle HTTP requests and state management in a standardized way.

#### Important

> This module only helps you to handle basic requests on your application. There is no magic, you are still responsible for providing correct midlewares to auth requests, handle responses and errors

## Getting started

### This package will expose the following

- The `ClientProvider` context that manages the base URL and error handling for token refresh operations, ensuring consistent configuration and error management across the application.
- The `useDataProvider` hook that provides a set of functions (post, get, put, patch, delete) to simplify making authenticated HTTP requests and handling responses.
- The `useQuery` hook to manage the state and lifecycle of asynchronous functions, handling loading, success, and error states automatically.

#### Important

- You have to provide api information to dataProvider make the requests correctly
- You have to provide utility funcions like getAccessToken, getNewToken (Refresh) so dataProvider can handle the requests correctly

### Installation & config

First add the Data Provider package to your project. You can install it using npm or yarn:

```bash
npm install @concepta/react-data-provider
```

```bash
yarn add @concepta/react-data-provider
```

## Using the `ClientProvider`

The `ClientProvider` component is essential for setting up the context that the Data Provider uses to manage the base URL and handle token refresh errors. It ensures that your application has a consistent configuration for making HTTP requests. Here's how you can use it in your application:

### Wrap Your App with `ClientProvider`:

To use the `ClientProvider`, wrap it around your application's root component. This is typically done in your `index.tsx` or `App.tsx` file. Provide the `baseUrl` and `onRefreshTokenError` props.

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import { ClientProvider } from '@concepta/react-data-provider';
import App from './App';

ReactDOM.render(
  <ClientProvider
    baseUrl="YOUR_API_URL"
    onRefreshTokenError={(error) => {
      console.error('Token refresh error:', error);
      // Handle token refresh error, e.g., redirect to login
    }}
  >
    <App />
  </ClientProvider>,
  document.getElementById('root'),
);
```

- `baseUrl` (optional): The base URL for all HTTP requests. This can be an environment variable instead.
- `onRefreshTokenError` (required): A callback function that handles errors occurring during the token refresh process.

### BaseUrl in the .env file

If you don't provide a `baseUrl` prop to your `ClientProvider`, you have to add a variable to your .env file called NEXT_PUBLIC_API_URL.

#### **`.env`**

```typescript filename=".env"
NEXT_PUBLIC_API_URL="[YOUR API BASE URL]
```

If you apply both methods, Data Provider will use the url provided for the `baseUrl` prop in `<ClientProvider>`

## API Request Methods and Parameters in useDataProvider

The `useDataProvider` hook provides an easy way to make HTTP requests using various methods: `POST`, `GET`, `PUT`, `PATCH`, and `DELETE`. Each method accepts specific parameters that help configure the request. Below is a detailed explanation of each method and its parameters.

### Shared parameters

All of the requests accepts these shared parameters:

- **uri** (string): The endpoint URI.
- **headers** (Record<string, string>, optional): Additional headers to include in the request.
- **queryParams** (Record<string, string | string[] | number | undefined>, optional): Query parameters to append to the URL.
- **body** (TRequestBody, optional): The request payload.
- **signal** (AbortSignal, optional): Signal to abort the request.

### POST | PUT | PATCH Methods

- The `post` method is used to send data to the server.
- The `put` method is used to update existing data on the server.
- The `patch` method is used to partially update existing data on the server.

Besides the shared parameters, they also accept:

- **body** (TRequestBody, optional): The request payload.

## The useQuery Hook

The `useQuery` hook is designed to handle asynchronous operations and manage the corresponding state, including loading, success, and error states. This section details how to use the `useQuery` hook, its parameters, and it's return.

### Parameters

The `useQuery` hook accepts four parameters

- **asyncFn** (AsyncFunction): An asynchronous function that performs the desired operation. This function should return a promise.
- **immediate** (boolean): A boolean indicating whether the function should be executed immediately when the hook is called. Defaults to `false`.
- **options** (object): An object containing various callback functions and data formatting options (more details below).
- **args** (boolean): Optional arguments to be passed to the asynchronous function when it is executed.

#### The Options parameters:

##### onError

A callback function that is called if the asynchronous function throws an error.

```typescript
onError: (error) => {
  console.error('An error occurred:', error);
};
```

##### onSuccess

A callback function that is called when the asynchronous function successfully completes.

```typescript
onSuccess: (data) => {
  console.log('Data fetched successfully:', data);
};
```

##### onFinish

A callback function that is called when the asynchronous operation finishes, regardless of whether it was successful or resulted in an error.

```typescript
onFinish: (status) => {
  console.log('Operation finished with status:', status);
};
```

##### formatData

A function that formats the data returned by the asynchronous function before it is set in the state.

```typescript
formatData: (data) => {
  return data.map((item) => ({
    ...item,
    formatted: true,
  }));
};
```

### `useQuery` return

The `useQuery` hook returns the following:

- **execute**: A function that can be called to manually trigger the asynchronous function.

- **status**: The current status of the asynchronous operation. Can be `idle`, `pending`, `success`, or `error`.

- **isPending**: A boolean indicating whether the asynchronous operation is currently in progress.

- **data**: The data returned by the asynchronous function, if the operation was successful.

- **error**: The error thrown by the asynchronous function, if any.

- **refresh**: A function that can be called to re-execute the asynchronous function with the same arguments.

## Example Usage

Simple post with useDataProvider

```typescript
import useDataProvider from '@concepta/react-data-provider';

const MyComponent = () => {
  const { post } = useDataProvider();

  const handleClick = () => {
    post({
      uri: '/todo-list',
      body: { text: 'Buy tomatoes' },
    });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        Add tomatoes
      </Button>
    </div>
  );
};
```

Get request with useQuery

```typescript
import { useDataProvider } from '@concepta/react-data-provider';

interface User {
  id: number;
  name: string;
  email: string;
}

const MyComponent = () => {
  const { get } = useDataProvider();

  const { execute, status, isPending, data, error, refresh } = useQuery<User[]>(
    fetchUsers,
    true,
    {
      onError: (error) => console.error('Error fetching users:', error),
      onSuccess: (data) => console.log('Fetched users:', data),
      onFinish: (status) => console.log('Fetch finished with status:', status),
    },
  );

  return (
    <div>
      My Component
      <button onClick={execute}>Get list</button>
    </div>
  );
};
```
