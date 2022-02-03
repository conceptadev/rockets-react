import React, {
  createContext,
  PropsWithChildren,
  useContext,
} from 'react';

const NotificationContext = createContext<any>({});

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {

  const [notification, setNotification] = React.useState<Notification | undefined>()

  React.useEffect(()=>{
    if(notification){
      setTimeout(()=>{
        setNotification(undefined);
      }, 3000)
    }
  }, [notification])

  return (
    <NotificationContext.Provider value={{ notification, notify: setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
