import { FormValidation } from '@rjsf/utils';
import { get, set } from 'lodash';

type RecursiveKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K | `${K & string}.${RecursiveKeyOf<T[K]> & string}`;
    }[keyof T]
  : never;

export type ValidationRule<T> = {
  field: RecursiveKeyOf<T>;
  test: (value: T[keyof T] | undefined | null, formData: T) => boolean;
  message: string;
};

export type ValidateFormErrors<T> = {
  [K in keyof T]?: boolean;
};

export const validateForm = <T>(
  formData: T,
  errors: FormValidation<T>,
  validationRules: ValidationRule<T>[],
): FormValidation<T> => {
  const errorsAdded: ValidateFormErrors<T> = {};

  for (const rule of validationRules) {
    const { field, test, message } = rule;

    const value = get(formData, field);

    if (test(value, formData)) {
      const fieldErrorsAdded = get(errorsAdded, field);

      if (!fieldErrorsAdded) {
        const errorField = get(errors, field);

        errorField?.addError(message);
        set(errorsAdded, field, true);
      }
    }
  }

  return errors;
};
