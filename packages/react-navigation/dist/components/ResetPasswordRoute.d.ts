/// <reference types="react" />
import { AuthModuleProps } from '@concepta/react-material-ui/';
type ResetPasswordRouteProps = {
    home: string;
    moduleProps?: AuthModuleProps;
};
declare const ResetPasswordRoute: ({ home, moduleProps }: ResetPasswordRouteProps) => JSX.Element;
export default ResetPasswordRoute;
