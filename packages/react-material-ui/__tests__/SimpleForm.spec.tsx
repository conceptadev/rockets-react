/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SimpleForm, { FormType } from '../src/components/SimpleForm/SimpleForm';
import { FormValidation } from '@rjsf/utils';

describe('SimpleForm Component', () => {
  it('should render correctly', () => {
    const form: FormType = {
      title: 'Test title',
      fields: {
        name: { type: 'string', title: 'Name' },
        age: { type: 'string', title: 'Age' },
      },
    };
    render(<SimpleForm form={form} />);
  });

  it('renders the title correctly', () => {
    const form: FormType = {
      title: 'Test title',
      fields: {
        name: { type: 'string', title: 'Name' },
        age: { type: 'string', title: 'Age' },
      },
    };
    const { getByText } = render(<SimpleForm form={form} />);
    const title = getByText('Test title');
    expect(title).toBeInTheDocument();
  });

  it('renders submit button correctly', () => {
    const form: FormType = {
      title: 'Test title',
      fields: {
        name: { type: 'string', title: 'Name' },
        age: { type: 'string', title: 'Age' },
      },
    };
    const { getByRole } = render(<SimpleForm form={form} />);
    const submitButton = getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
  });

  it('applies submitButtonLabel correctly', () => {
    const form: FormType = {
      title: 'Test title',
      submitButtonLabel: 'Send',
      fields: {
        name: { type: 'string', title: 'Name' },
        age: { type: 'string', title: 'Age' },
      },
    };
    const { getByRole } = render(<SimpleForm form={form} />);
    const submitButton = getByRole('button', { name: 'Send' });
    expect(submitButton).toBeInTheDocument();
  });

  it('renders * in label on "required" fields', () => {
    const form: FormType = {
      title: 'Test title',
      submitButtonLabel: 'Send',
      fields: {
        name: { type: 'string', title: 'Name', required: true },
        age: { type: 'string', title: 'Age', required: true },
      },
    };
    const { getByText } = render(<SimpleForm form={form} />);
    const nameLabel = getByText('Name *');
    const ageLabel = getByText('Age *');
    expect(nameLabel).toBeInTheDocument();
    expect(ageLabel).toBeInTheDocument();
  });

  it("displays form's initial data correctly", () => {
    const form: FormType = {
      title: 'Test title',
      fields: {
        name: { type: 'string', title: 'Name' },
        age: { type: 'string', title: 'Age' },
      },
    };
    const initialData = {
      name: 'John',
      age: '20',
    };
    render(<SimpleForm form={form} initialData={initialData} />);
    const nameInput = document.querySelector('#root_name');
    const ageInput = document.querySelector('#root_age');
    expect(nameInput).toHaveValue('John');
    expect(ageInput).toHaveValue('20');
  });

  it('calls onSubmit when submit button is clicked', () => {
    const form: FormType = {
      title: 'Test title',
      fields: {
        name: { type: 'string', title: 'Name' },
        age: { type: 'string', title: 'Age' },
      },
    };
    const onSubmit = jest.fn();
    const { getByRole } = render(
      <SimpleForm form={form} onSubmit={onSubmit} />,
    );
    const submitButton = getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalled();
  });

  it('submits data correctly', () => {
    const form: FormType = {
      title: 'Test title',
      fields: {
        name: { type: 'string', title: 'Name' },
        age: { type: 'string', title: 'Age' },
      },
    };
    const testData = {
      name: 'John',
      age: '20',
    };
    const onSubmit = jest.fn();
    const { getByRole } = render(
      <SimpleForm form={form} onSubmit={onSubmit} />,
    );
    const nameInput = document.querySelector('#root_name');
    const ageInput = document.querySelector('#root_age');
    nameInput &&
      fireEvent.change(nameInput, { target: { value: testData.name } });
    ageInput && fireEvent.change(ageInput, { target: { value: testData.age } });
    const submitButton = getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);
    expect(onSubmit.mock.calls[0][0].formData).toEqual(testData);
  });

  it('handles required fields errors automatically', () => {
    const form: FormType = {
      title: 'Test title',
      fields: {
        name: { type: 'string', title: 'Name', required: true },
        age: { type: 'string', title: 'Age', required: true },
      },
    };
    const onSubmit = jest.fn();
    const { getByRole, queryAllByText } = render(
      <SimpleForm form={form} onSubmit={onSubmit} />,
    );
    const submitButton = getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);
    const errorMessages = queryAllByText('is a required property');
    expect(errorMessages.length).toBe(2);
  });

  it('runs validation function correctly if provided', () => {
    interface FormData {
      name: string;
      age: string;
    }
    const form: FormType = {
      title: 'Test title',
      fields: {
        name: { type: 'string', title: 'Name' },
        age: { type: 'string', title: 'Age' },
      },
    };
    const testData = {
      name: 'John',
      age: '20',
    };
    const validate = (formData: FormData, errors: FormValidation) => {
      expect(formData).toEqual(testData);
      return errors;
    };
    const onSubmit = jest.fn();
    const { getByRole } = render(
      <SimpleForm form={form} validate={validate} onSubmit={onSubmit} />,
    );
    const submitButton = getByRole('button', { name: 'Submit' });
    const nameInput = document.querySelector('#root_name');
    const ageInput = document.querySelector('#root_age');
    nameInput &&
      fireEvent.change(nameInput, { target: { value: testData.name } });
    ageInput && fireEvent.change(ageInput, { target: { value: testData.age } });
    fireEvent.click(submitButton);
  });

  it('displays error messages for invalid form fields', () => {
    interface FormData {
      name: string;
      age: string;
    }
    const form: FormType = {
      title: 'Test title',
      fields: {
        name: { type: 'string', title: 'Name' },
        age: { type: 'string', title: 'Age' },
      },
    };
    const testData = {
      name: 'Jo',
      age: '10',
    };
    const validate = (formData: FormData, errors: FormValidation) => {
      console.log('formData', formData);
      if (formData.name.length < 3) {
        errors?.name?.addError('Name must be at least 3 characters long');
      }
      if (Number(formData.age) < 18) {
        errors?.age?.addError('You must be at least 18 years old');
      }
      console.log('errors', errors);
      return errors;
    };
    const onSubmit = jest.fn();
    const { getByRole, getByText } = render(
      <SimpleForm form={form} validate={validate} onSubmit={onSubmit} />,
    );
    const submitButton = getByRole('button', { name: 'Submit' });
    const nameInput = document.querySelector('#root_name');
    const ageInput = document.querySelector('#root_age');
    nameInput &&
      fireEvent.change(nameInput, { target: { value: testData.name } });
    ageInput && fireEvent.change(ageInput, { target: { value: testData.age } });
    fireEvent.click(submitButton);
    const nameError = getByText('Name must be at least 3 characters long');
    const ageError = getByText('You must be at least 18 years old');
    expect(nameError).toBeInTheDocument();
    expect(ageError).toBeInTheDocument();
  });

  it('applies titleTextProps correctly', () => {
    const testTextProps = {
      color: 'rgb(255, 255, 0)',
      fontWeight: 600,
    };
    const form: FormType = {
      fields: {
        name: { type: 'string', title: 'Name' },
        age: { type: 'string', title: 'Age' },
      },
      title: 'Test title',
      titleTextProps: {
        color: testTextProps.color,
        fontWeight: testTextProps.fontWeight,
      },
    };
    const { getByText } = render(<SimpleForm form={form} />);
    const titleElement = getByText('Test title');
    const styles = window.getComputedStyle(titleElement);
    expect(styles.color).toBe(testTextProps.color);
    expect(styles.fontWeight).toBe(testTextProps.fontWeight.toString());
  });

  it('applies titleTextProps correctly', () => {
    const testButtonProps = {
      width: '80px',
      marginTop: '20px',
    };
    const form: FormType = {
      fields: {
        name: { type: 'string', title: 'Name' },
        age: { type: 'string', title: 'Age' },
      },
      title: 'Test title',
      submitButtonProps: {
        disabled: true,
        sx: {
          width: testButtonProps.width,
          marginTop: testButtonProps.marginTop,
        },
      },
    };
    const { getByRole } = render(<SimpleForm form={form} />);
    const submitButton = getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeDisabled();
    const styles = window.getComputedStyle(submitButton);
    expect(styles.width).toBe(testButtonProps.width);
    expect(styles.marginTop).toBe(testButtonProps.marginTop);
  });

  it('should render every input type with the correct type', () => {
    const form: FormType = {
      title: 'Test title',
      submitButtonLabel: 'Send',
      fields: {
        string: {
          type: 'string',
          title: 'String',
        },
        checkbox: { type: 'checkbox', title: 'Checkbox' },
        checkboxes: {
          type: 'checkboxes',
          title: 'Checkboxes',
          options: [
            'checkboxesOption1',
            'checkboxesOption2',
            'checkboxesOption3',
          ],
        },
        select: {
          title: 'Select',
          type: 'select',
          options: ['selectOption1', 'selectOption2', 'selectOption3'],
        },
        stringArray: { type: 'stringArray', title: 'String Array' },
        objectArray: {
          type: 'array',
          title: 'Object Array',
          fields: {
            string: {
              title: 'Object String',
              type: 'string',
            },
            checkBox: {
              title: 'Object Checkbox',
              type: 'checkbox',
            },
          },
        },
        radio: {
          type: 'radio',
          title: 'Radio',
          options: [
            { value: 'radioOption1', label: 'RadioOption1' },
            { value: 'radioOption2', label: 'RadioOption2' },
            { value: 'radioOption3', label: 'RadioOption3' },
          ],
        },
        switch: {
          type: 'switch',
          title: 'Switch',
        },
      },
    };

    const initialData = {
      stringArray: ['stringForStringArr0', 'stringForStringArr1'],
    };
    const { getByLabelText, getAllByLabelText, getByTestId } = render(
      <SimpleForm form={form} initialData={initialData} />,
    );
    const stringInput = getByLabelText('String');
    expect(stringInput).toHaveAttribute('type', 'text');

    const checkboxInput = getByLabelText('Checkbox');
    expect(checkboxInput).toHaveAttribute('type', 'checkbox');

    const checkBoxesOptionOne = getByLabelText('checkboxesOption1');
    expect(checkBoxesOptionOne).toHaveAttribute('type', 'checkbox');

    const selectInput = getByTestId('select');
    const selectComboBox = selectInput.querySelector('[role="combobox"]');
    expect(selectComboBox).toBeInTheDocument();

    const stringArrayInputs = getAllByLabelText('String Array');
    expect(stringArrayInputs.length).toBe(initialData.stringArray.length);
    expect(stringArrayInputs[0]).toHaveValue(initialData.stringArray[0]);
    expect(stringArrayInputs[1]).toHaveValue(initialData.stringArray[1]);

    const objectStringInput = getByLabelText('Object String');
    const objectCheckboxInput = getByLabelText('Object Checkbox');
    expect(objectStringInput).toHaveAttribute('type', 'text');
    expect(objectCheckboxInput).toHaveAttribute('type', 'checkbox');

    const radioInput = getByLabelText('RadioOption1');
    expect(radioInput).toHaveAttribute('type', 'radio');

    const switchInput = getByLabelText('Switch');
    expect(switchInput).toHaveAttribute('type', 'checkbox');
  });
});
