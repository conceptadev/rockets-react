# @rockets-react/notification-provider

Rockets Notification package to handle all notifications you may need in your application.

## IMPORTANT

When building your notification system, you need to remember these!

> This module only helps you to handle notification on your application. There is no magic, you are still responsible for
> having a Notification component and maitaing the state and notification messages of your application.

## Here is how it works

### This package will expose the following

- A provider and a hook to access notification information like title, message and messageType and to create new notifications

## Examples

These are very rough examples. We intend to improve them ASAP.

### Simple User Login

```typescript
import {useAuth } from "@rockts-org/auth-provider";
import { NotificationProvider, useNotification } from "@rockts-org/notification-provider";

const LoginForm = () => {
  const {doLogin, user } = useAuth();
  const {notification, notify} = useNotification();
  
  React.useEffect(()=>{
    if(user){
      notify({
        title: 'Success',
        message: 'Login Success',
        messageType: 'success',
      })
    }
  }, [user])

  const onClickSignIn = async (user: string, password: string) => {
    doLogin({ email: user, password });
  }

  return <>
    <SimpleLoginForm onClickSignIn={onClickSignIn} />;
    {notification && <Notification {...notification}>}
  </>
}

const AppWrapper: React.FC = () => {
  return 
  <NotificationProvider>
    <LoginForm />
  </NotificationProvider>
}

```