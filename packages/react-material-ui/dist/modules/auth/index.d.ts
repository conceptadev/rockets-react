/// <reference types="react" />
import { AuthFormSubmoduleProps } from '../../components/submodules/AuthForm';
export interface AuthModuleProps extends AuthFormSubmoduleProps {
    formProps?: Omit<AuthFormSubmoduleProps, 'route'>;
}
export declare const AuthModule: (props: AuthModuleProps) => JSX.Element;
