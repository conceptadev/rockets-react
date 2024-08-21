/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SelectField } from '../src/components/SelectField';

describe('SelectField Component', () => {
  const props = {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
    defaultValue: '',
    label: 'Test Select',
    onChange: jest.fn(),
  };

  it('should render correctly', () => {
    render(<SelectField {...props} />);
  });

  it('renders label correctly', () => {
    const { getByLabelText } = render(<SelectField {...props} />);

    const label = getByLabelText(props.label);
    expect(label).toBeInTheDocument();
  });

  it('should render correct options if the "all" option on top', () => {
    const { getByText, getByRole, queryAllByRole } = render(
      <SelectField {...props} />,
    );

    const comboBox = getByRole('combobox');
    fireEvent.mouseDown(comboBox);

    const options = queryAllByRole('option');
    expect(options).toHaveLength(props.options.length + 1);
    expect(options?.[0]).toHaveTextContent('All');

    props.options.forEach((option) => {
      const optionElement = getByText(option.label);
      expect(optionElement).toBeInTheDocument();
    });
  });

  it('should render skeleton if "isLoading" is true', () => {
    const { container } = render(<SelectField {...props} isLoading />);

    const skeleton = container.querySelector('.MuiSkeleton-root');
    expect(skeleton).toBeInTheDocument();
  });

  it('calls the onChange callback when an option is selected', () => {
    const { getByText, getByRole, queryAllByRole } = render(
      <SelectField {...props} />,
    );

    const comboBox = getByRole('combobox');
    fireEvent.mouseDown(comboBox);

    const options = queryAllByRole('option');

    fireEvent.click(options[1]);

    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('disables the select component when disabled prop is true', () => {
    const { container } = render(<SelectField {...props} disabled />);

    const input = container.querySelector('input');
    expect(input).toBeDisabled();
  });
});
