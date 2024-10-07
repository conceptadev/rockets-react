import { FormValidation } from '@rjsf/utils';
type RecursiveKeyOf<T> = T extends object ? {
    [K in keyof T]: K | `${K & string}.${RecursiveKeyOf<T[K]> & string}`;
}[keyof T] : never;
export type ValidationRule<T> = {
    field: RecursiveKeyOf<T>;
    test: (value: T[keyof T] | undefined | null, formData: T) => boolean;
    message: string;
};
export type ValidateFormErrors<T> = {
    [K in keyof T]?: boolean;
};
export declare const validateForm: <T>(formData: T, errors: FormValidation<T>, validationRules: ValidationRule<T>[]) => FormValidation<T>;
export {};
