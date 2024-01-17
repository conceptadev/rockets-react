/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AutocompleteField from '../src/components/AutocompleteField/AutocompleteField';

describe('AutocompleteField', () => {
  const props = {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    isLoading: false,
    currentValue: '',
    defaultValue: undefined,
    label: 'Test Label',
    onChange: jest.fn(),
  };

  it('should render correctly', () => {
    render(<AutocompleteField {...props} />);
  });

  it('should show all options correctly when input is clicked', () => {
    const { getByLabelText, getByText } = render(
      <AutocompleteField {...props} />,
    );
    const input = getByLabelText('Test Label');

    fireEvent.mouseDown(input);

    const allOption = getByText('All');
    expect(allOption).toBeInTheDocument();

    props.options.forEach((option) => {
      const optionElement = getByText(option.label);
      expect(optionElement).toBeInTheDocument();
    });
  });

  it('should select an option when clicked', () => {
    const { getByLabelText, getByText } = render(
      <AutocompleteField {...props} />,
    );
    const input = getByLabelText('Test Label');
    fireEvent.mouseDown(input);

    const option2 = getByText('Option 2');
    fireEvent.click(option2);

    expect(props.onChange).toHaveBeenCalledWith('option2');
  });

  it('should show skeleton if "isLoading" is passed', () => {
    const { container } = render(<AutocompleteField {...props} isLoading />);

    const skeleton = container.querySelector('.MuiSkeleton-root');
    expect(skeleton).toBeInTheDocument();
  });

  it('should show label if label is passed', () => {
    const { container } = render(<AutocompleteField {...props} />);

    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
  });

  it('should hide label if not passed', () => {
    const { container } = render(
      <AutocompleteField {...props} label={undefined} />,
    );

    const label = container.querySelector('label');
    expect(label).not.toBeInTheDocument();
  });

  it('should display default value if passed', () => {
    const { getByLabelText } = render(
      <AutocompleteField {...props} defaultValue={props.options[2]} />,
    );

    const input = getByLabelText('Test Label');
    expect(input).toHaveValue('Option 3');
  });
});
