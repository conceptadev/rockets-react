import { validateForm, ValidationRule } from '../src/utils/form/validation';
import { createErrorHandler, ERRORS_KEY } from '@rjsf/utils';

describe('validateForm', () => {
  type SampleData = {
    name: string;
    age: number;
    email: string;
  };

  const validationRules: ValidationRule<SampleData>[] = [
    {
      field: 'name',
      test: (value) => !value || (value as string)?.length === 0,
      message: 'Name is required',
    },
    {
      field: 'name',
      test: (value) => (value as string)?.length < 3,
      message: 'Name length must be greater than 3',
    },
    {
      field: 'age',
      test: (value) =>
        !value || (value as number) < 18 || (value as number) > 60,
      message: 'Age must be more than 18 and less than 60',
    },
    {
      field: 'email',
      test: (value) => !value,
      message: 'Email is required',
    },
    {
      field: 'email',
      test: (value) => !(value as string)?.includes('@'),
      message: 'Email must contain @',
    },
    {
      field: 'email',
      test: (value) =>
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value as string,
        ),
      message: 'Invalid email',
    },
  ];

  it('should return empty errors when all fields pass validation', () => {
    const formData: SampleData = {
      name: 'John Doe',
      age: 22,
      email: 'john.doe@example.com',
    };

    const result = validateForm(
      formData,
      createErrorHandler(formData),
      validationRules,
    );

    expect(result).toEqual({
      [ERRORS_KEY]: [],
      addError: expect.any(Function),
      name: { [ERRORS_KEY]: [], addError: expect.any(Function) },
      age: { [ERRORS_KEY]: [], addError: expect.any(Function) },
      email: { [ERRORS_KEY]: [], addError: expect.any(Function) },
    });
  });

  it('should return errors for fields that fail validation', () => {
    const formData: SampleData = {
      name: '',
      age: 16,
      email: 'invalid-email@asd',
    };

    const result = validateForm(
      formData,
      createErrorHandler(formData),
      validationRules,
    );

    expect(result).toEqual({
      [ERRORS_KEY]: [],
      addError: expect.any(Function),
      name: {
        [ERRORS_KEY]: ['Name is required'],
        addError: expect.any(Function),
      },
      age: {
        [ERRORS_KEY]: ['Age must be more than 18 and less than 60'],
        addError: expect.any(Function),
      },
      email: {
        [ERRORS_KEY]: ['Invalid email'],
        addError: expect.any(Function),
      },
    });
  });

  it('should add error only once for a field that fails validation multiple times', () => {
    const formData: SampleData = {
      name: 'John Doe',
      age: 28,
      email: 'invalid-email',
    };

    const result = validateForm(
      formData,
      createErrorHandler(formData),
      validationRules,
    );

    expect(result).toEqual({
      [ERRORS_KEY]: [],
      addError: expect.any(Function),
      name: {
        [ERRORS_KEY]: [],
        addError: expect.any(Function),
      },
      age: {
        [ERRORS_KEY]: [],
        addError: expect.any(Function),
      },
      email: {
        [ERRORS_KEY]: ['Email must contain @'],
        addError: expect.any(Function),
      },
    });
  });
});
