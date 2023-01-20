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

### Add your API's base URL

There are two options to pass the base URL to the data provider:

- Use our `<ClientProvider baseUrl="[YOUR API BASE URL]">` to wrap your App and provide the baseUrl as a prop

```typescript
import { ClientProvider } from '@concepta/react-data-provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ClientProvider baseUrl="[YOUR API BASE URL]">
      <App />
    </ClientProvider>
  </React.StrictMode>,
);
```

- Or add the variable `REACT_APP_API_URL` to your .env file

```typescript
REACT_APP_API_URL="[YOUR API BASE URL]
```

If you apply both methods, Data Provider will use the url provider to `<ClientProvider>`

## Examples

These are very rough examples. We intend to improve them ASAP.

### Post with body

```typescript
import useDataProvider from '@concepta/react-data-provider';

const Home: React.FC = () => {
  const { post } = useDataProvider();

  const handleClick = () => {
    post({
      uri: '/todo-list',
      body: { text: 'Buy tomatoes' },
    });
  };

  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Add tomatoes
      </Button>
    </>
  );
};
```

### Get with helpers

If you need more control over the request process, you can use the `useQuery` hook to make your requests.

```typescript
import useDataProvider, { useQuery } from '@concepta/react-data-provider';

const Main: FC = () => {
  const { get } = useDataProvider();

  const getPokemon = () =>
    get({
      uri: 'https://pokeapi.co/api/v2/pokemon/?limit=20',
    });

  const { execute } = useQuery(getPokemon, false, {
    onSuccess: (data) => {
      if (data) {
        console.log('pokemon', data);
      }
    },
    onError: (error: Error) => {
      console.error({ error });
    },
    onFinish: () => {
      console.log('pokemon loaded');
    },
  });

  return (
    <ScreenWithContainer currentId="home">
      <Box display="flex" flexDirection="column">
        Main page
        <Button variant="contained" onClick={execute}>
          Imma button
        </Button>
      </Box>
    </ScreenWithContainer>
  );
};
```
