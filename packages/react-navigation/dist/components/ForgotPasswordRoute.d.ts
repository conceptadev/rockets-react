/// <reference types="react" />
import { AuthModuleProps } from '@concepta/react-material-ui/';
type ForgotPasswordRouteProps = {
    home: string;
    moduleProps?: AuthModuleProps;
};
declare const ForgotPasswordRoute: ({ home, moduleProps, }: ForgotPasswordRouteProps) => JSX.Element;
export default ForgotPasswordRoute;
