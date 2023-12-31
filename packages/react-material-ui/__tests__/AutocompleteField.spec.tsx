/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AutocompleteField, {
  AutocompleteFieldProps,
} from '../src/components/AutocompleteField/AutocompleteField';

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

describe('AutocompleteField Component', () => {
  const options: AutocompleteFieldProps['options'] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const props = {
    options,
    isLoading: false,
    currentValue: 'option1',
    defaultValue: options[0],
    onChange: jest.fn(),
  };

  it('should render correctly', () => {
    render(<AutocompleteField {...props} />);
  });

  it('should render options correctly', () => {
    const { getByText, getByRole } = render(<AutocompleteField {...props} />);

    const autocompleteField = getByRole('combobox');
    fireEvent.mouseDown(autocompleteField);

    options.forEach((option) => {
      const optionElement = getByText(option.label);
      expect(optionElement).toBeInTheDocument();
    });
  });

  it('should render loading state correctly', () => {
    const loadingStateProps = {
      ...props,
      isLoading: true,
    };

    const container = render(<AutocompleteField {...loadingStateProps} />);

    const autocompleteField = container.queryByRole('combobox');
    expect(autocompleteField).not.toBeInTheDocument();

    const loadingSkeleton = document.querySelector('.MuiSkeleton-root');
    expect(loadingSkeleton).toBeInTheDocument();
  });

  it('should filter options when a string is typed on the input', () => {
    const { getByText, getByRole, queryByText, debug } = render(
      <AutocompleteField {...props} />,
    );

    const autocompleteField = getByRole('combobox');
    fireEvent.mouseDown(autocompleteField);

    options.forEach((option) => {
      const optionElement = getByText(option.label);
      expect(optionElement).toBeInTheDocument();
    });

    fireEvent.change(autocompleteField, { target: { value: '1' } });

    expect(queryByText('Option 1')).toBeInTheDocument();
    expect(queryByText('Option 2')).not.toBeInTheDocument();
    expect(queryByText('Option 3')).not.toBeInTheDocument();
  });

  it('should call the onChange callback when an option is selected', () => {
    const { getByText, getByRole } = render(<AutocompleteField {...props} />);

    const autocompletField = getByRole('combobox');
    fireEvent.mouseDown(autocompletField);

    const option2 = getByText(options[1].label);

    expect(option2).toBeInTheDocument();

    fireEvent.click(option2);

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(autocompletField).toHaveValue('Option 2');
  });

  it('should clear input and render list when Clear button is clicked', () => {
    const { getByText, getByRole, queryByText, getByLabelText, debug } = render(
      <AutocompleteField {...props} />,
    );

    const autocompleteField = getByRole('combobox');
    fireEvent.mouseDown(autocompleteField);

    options.forEach((option) => {
      const optionElement = getByText(option.label);
      expect(optionElement).toBeInTheDocument();
    });

    fireEvent.change(autocompleteField, { target: { value: '1' } });

    expect(queryByText('Option 1')).toBeInTheDocument();
    expect(queryByText('Option 2')).not.toBeInTheDocument();
    expect(queryByText('Option 3')).not.toBeInTheDocument();

    fireEvent.mouseDown(autocompleteField);

    const clearButton = getByLabelText('Clear');
    fireEvent.click(clearButton);

    options.forEach((option) => {
      const optionElement = getByText(option.label);
      expect(optionElement).toBeInTheDocument();
    });
  });
});
