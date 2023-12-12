/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Radio from '../src/components/RadioGroup/RadioGroup';

describe('Radio Component', () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2', disabled: true },
    { label: 'Option 3', value: 'option3' },
  ];

  const props = {
    id: 'radioGroup',
    options,
    label: 'Radio Group',
    onChange: jest.fn(),
  };

  it('should render correctly', () => {
    const { getByLabelText } = render(<Radio options={props.options} />);
    const radioOption1 = getByLabelText('Option 1');
    const radioOption2 = getByLabelText('Option 2');
    const radioOption3 = getByLabelText('Option 3');

    expect(radioOption1).toBeInTheDocument();
    expect(radioOption2).toBeInTheDocument();
    expect(radioOption3).toBeInTheDocument();
  });

  it('renders label correctly', () => {
    const { getByText } = render(<Radio {...props} />);
    const radioGroupLabel = getByText('Radio Group');

    expect(radioGroupLabel).toBeInTheDocument();
  });

  it('renders * in label if is "required"', () => {
    const { getByText } = render(<Radio {...props} required />);
    const radioGroupLabel = getByText('Radio Group *');

    expect(radioGroupLabel).toBeInTheDocument();
  });

  it('renders disabled option as disabled', () => {
    const { getByLabelText } = render(<Radio {...props} />);
    const radioOption2 = getByLabelText('Option 2');

    expect(radioOption2).toBeDisabled();
  });

  it('should call onChange when a radio option is selected', () => {
    const { getByLabelText } = render(<Radio {...props} />);
    const radioOption3 = getByLabelText('Option 3');

    fireEvent.click(radioOption3);

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange.mock.calls[0][1]).toBe('option3');
  });
});
