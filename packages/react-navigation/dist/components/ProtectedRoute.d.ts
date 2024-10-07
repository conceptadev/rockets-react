import { PropsWithChildren } from 'react';
type ProtectedRouteProps = {
    redirectPath?: string;
};
declare const ProtectedRoute: ({ children, redirectPath, }: PropsWithChildren<ProtectedRouteProps>) => JSX.Element;
export default ProtectedRoute;
