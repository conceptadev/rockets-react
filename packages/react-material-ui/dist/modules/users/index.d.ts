import { ModuleProps } from '../crud';
type UsersModuleProps = {
    onEditSuccess: (data?: unknown) => void;
    onEditError: (data?: unknown) => void;
    onCreateSuccess: (data?: unknown) => void;
    onCreateError: (data?: unknown) => void;
    onDeleteSuccess: (data?: unknown) => void;
    onDeleteError: (data?: unknown) => void;
} & Partial<ModuleProps>;
declare const UsersModule: ({ onEditError, onEditSuccess, onCreateSuccess, onCreateError, onDeleteSuccess, onDeleteError, ...props }: UsersModuleProps) => JSX.Element;
export default UsersModule;
