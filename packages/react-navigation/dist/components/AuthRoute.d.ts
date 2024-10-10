/// <reference types="react" />
import { AuthModuleProps } from '@concepta/react-material-ui/';
type Route = 'signIn' | 'signUp' | 'forgotPassword' | 'resetPassword';
type AuthRouteProps = {
    home: string;
    moduleProps?: AuthModuleProps;
    route: Route;
};
declare const AuthRoute: (props: AuthRouteProps) => JSX.Element;
export default AuthRoute;
