/// <reference types="react" />
import { AuthModuleProps } from '@concepta/react-material-ui/';
type SignUpRouteProps = {
    home: string;
    moduleProps?: AuthModuleProps;
};
declare const SignUpRoute: ({ home, moduleProps }: SignUpRouteProps) => JSX.Element;
export default SignUpRoute;
