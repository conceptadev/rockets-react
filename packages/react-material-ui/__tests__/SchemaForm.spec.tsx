/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SchemaForm, {
  SchemaFormProps,
} from '../src/components/SchemaForm/SchemaForm';

describe('SchemaForm Component', () => {
  it('should render correctly', () => {
    const schema: SchemaFormProps['schema'] = {
      type: 'object',
      properties: {
        string: { type: 'string', title: 'String' },
        number: { type: 'number', title: 'Number' },
      },
    };
    render(<SchemaForm.Form schema={schema} />);
  });

  it('renders * in label on "required" fields', () => {
    const schema: SchemaFormProps['schema'] = {
      type: 'object',
      required: ['name', 'age'],
      properties: {
        name: { type: 'string', title: 'Name' },
        age: { type: 'number', title: 'Age' },
      },
    };
    const { getByLabelText } = render(<SchemaForm.Form schema={schema} />);

    const nameInput = getByLabelText('Name *');
    const ageInput = getByLabelText('Age *');

    expect(nameInput).toBeInTheDocument();
    expect(ageInput).toBeInTheDocument();
  });

  it('renders title correctly', () => {
    const schema: SchemaFormProps['schema'] = {
      type: 'object',
      title: 'Test title',
      properties: {
        name: { type: 'string', title: 'Name' },
      },
    };
    const { getByText } = render(<SchemaForm.Form schema={schema} />);
    const title = getByText('Test title');
    expect(title).toBeInTheDocument();
  });

  it('renders custom button correctly', () => {
    const schema: SchemaFormProps['schema'] = {
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name' },
      },
    };
    const { getByText, debug } = render(
      <SchemaForm.Form schema={schema}>
        <button>Test button</button>
      </SchemaForm.Form>,
    );
    debug();
    const title = getByText('Test button');
    expect(title).toBeInTheDocument();
  });

  it('shows validation errors if required fields are missing after submit', () => {
    const schema: SchemaFormProps['schema'] = {
      type: 'object',
      required: ['name', 'age'],
      properties: {
        name: { type: 'string', title: 'Name' },
        age: { type: 'number', title: 'Age' },
      },
    };
    const { getByText, queryAllByText } = render(
      <SchemaForm.Form schema={schema} />,
    );

    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    const errors = queryAllByText('is a required property');

    expect(errors).toHaveLength(2);
  });

  it('renders the form with the provided schema, for each input type', () => {
    const schema: SchemaFormProps['schema'] = {
      type: 'object',
      properties: {
        string: { type: 'string', title: 'String' },
        number: { type: 'number', title: 'Number' },
        integer: { type: 'integer', title: 'Integer' },
        boolean: { type: 'boolean', title: 'Boolean' },
        // select
        arrayOfStrings: {
          type: 'array',
          title: 'Array of strings',
          items: {
            type: 'string',
            default: 'Test string array',
          },
        },
        // checkboxes
        arrayOfCheckboxes: {
          type: 'array',
          title: 'Array of checkboxes',
          items: {
            type: 'string',
            enum: ['checkbox0', 'checkbox1', 'checkbox2'],
          },
          uniqueItems: true,
        },
      },
    };
    const uiSchema = {
      arrayOfCheckboxes: {
        'ui:widget': 'checkboxes',
      },
    };
    const formData = {
      arrayOfStrings: ['foo', 'bar'],
    };
    const { getByLabelText } = render(
      <SchemaForm.Form
        schema={schema}
        formData={formData}
        uiSchema={uiSchema}
      />,
    );
    const stringInput = getByLabelText('String');
    expect(stringInput).toBeInTheDocument();
    expect(stringInput).toHaveAttribute('type', 'text');

    const numberInput = getByLabelText('Number');
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveAttribute('type', 'number');

    const integerInput = getByLabelText('Integer');
    expect(integerInput).toBeInTheDocument();
    expect(integerInput).toHaveAttribute('type', 'number');

    const booleanInput = getByLabelText('Boolean');
    expect(booleanInput).toBeInTheDocument();
    expect(booleanInput).toHaveAttribute('type', 'checkbox');

    // Test text input from array field
    const arrayStringInput0 = getByLabelText('arrayOfStrings-0');
    expect(arrayStringInput0).toBeInTheDocument();
    expect(arrayStringInput0).toHaveAttribute('type', 'text');

    const arrayStringInput1 = getByLabelText('arrayOfStrings-1');
    expect(arrayStringInput1).toBeInTheDocument();
    expect(arrayStringInput1).toHaveAttribute('type', 'text');

    // Test checkboxes input from array field
    const checkboxInput0 = getByLabelText('checkbox0');
    expect(checkboxInput0).toBeInTheDocument();
    expect(checkboxInput0).toHaveAttribute('type', 'checkbox');
  });
  it('renders correct initial data', () => {
    const schema: SchemaFormProps['schema'] = {
      type: 'object',
      properties: {
        string: { type: 'string', title: 'String' },
        number: { type: 'number', title: 'Number' },
        integer: { type: 'integer', title: 'Integer' },
        boolean: { type: 'boolean', title: 'Boolean' },
      },
    };
    const formData = {
      string: 'stringValue',
      number: 2.5,
      integer: 4,
      boolean: true,
    };
    const { getByLabelText } = render(
      <SchemaForm.Form schema={schema} formData={formData} />,
    );

    const stringInput = getByLabelText('String');
    expect(stringInput).toBeInTheDocument();
    expect(stringInput).toHaveAttribute('value', formData.string);

    const numberInput = getByLabelText('Number');
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveAttribute('value', String(formData.number));

    const integerInput = getByLabelText('Integer');
    expect(integerInput).toBeInTheDocument();
    expect(integerInput).toHaveAttribute('value', String(formData.integer));

    const booleanInput = getByLabelText('Boolean');
    expect(booleanInput).toBeInTheDocument();
    expect(booleanInput).toHaveAttribute('checked');
  });

  it('calls the onSubmit callback when the form is submitted', () => {
    const schema: SchemaFormProps['schema'] = {
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name' },
        age: { type: 'number', title: 'Age' },
      },
    };
    const onSubmit = jest.fn();
    const { getByLabelText, getByText } = render(
      <SchemaForm.Form schema={schema} onSubmit={onSubmit} />,
    );

    const nameInput = getByLabelText('Name');
    const ageInput = getByLabelText('Age');
    const submitButton = getByText('Submit');

    const fakeData = { name: 'John', age: 22 };

    fireEvent.change(nameInput, { target: { value: fakeData.name } });
    fireEvent.change(ageInput, { target: { value: fakeData.age } });
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0].formData).toEqual(fakeData);
  });
});
