import { ReactNode } from 'react';
import type { RJSFSchema, UiSchema } from '@rjsf/utils';
import type { AdvancedProperty } from '../../SchemaForm/types';
import type { ValidationRule } from '../../../utils/form/validation';
type Route = 'signIn' | 'signUp' | 'forgotPassword' | 'resetPassword';
type Query = {
    uri?: string;
    method?: string;
    onSuccess?: ((data: unknown) => void) | null;
    onError?: ((error: unknown) => void) | null;
};
type FormData = Record<string, unknown> | null;
export interface AuthFormSubmoduleProps {
    route: Route;
    query?: Query;
    title?: string | ReactNode;
    hideTitle?: boolean;
    formSchema?: RJSFSchema;
    formUiSchema?: UiSchema;
    advancedProperties?: Record<string, AdvancedProperty>;
    formData?: FormData;
    signInRequestPath?: string;
    signInPath?: string;
    signUpPath?: string;
    forgotPasswordPath?: string;
    customValidation?: ValidationRule<Record<string, string>>[];
    submitButtonTitle?: string;
    logoSrc?: string;
    hideLogo?: boolean;
    headerComponent?: ReactNode;
    overrideDefaults?: boolean;
    submitDataFormatter?: (data: FormData) => FormData;
}
declare const AuthFormSubmodule: (props: AuthFormSubmoduleProps) => JSX.Element;
export default AuthFormSubmodule;
