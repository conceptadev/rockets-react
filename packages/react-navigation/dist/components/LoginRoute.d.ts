/// <reference types="react" />
import { AuthModuleProps } from '@concepta/react-material-ui/';
type LoginRouteProps = {
    home: string;
    moduleProps?: AuthModuleProps;
};
declare const LoginRoute: ({ home, moduleProps }: LoginRouteProps) => JSX.Element;
export default LoginRoute;
