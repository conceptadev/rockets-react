/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Select, { SelectOptions } from '../src/components/Select/Select';

describe('Select Component', () => {
  const options: SelectOptions[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const props = {
    options,
    label: 'Select Field',
    onChange: jest.fn(),
  };

  it('should render correctly', () => {
    render(<Select {...props} />);
  });

  it('renders label correctly', () => {
    const { getByLabelText } = render(<Select {...props} />);

    const select = getByLabelText(props.label);
    expect(select).toBeInTheDocument();
  });

  it('renders * in label if is "required"', () => {
    const { getByLabelText } = render(<Select {...props} required />);

    const select = getByLabelText('Select Field *');
    expect(select).toBeInTheDocument();
  });

  it('renders options correctly', () => {
    const { getByLabelText, getByText } = render(<Select {...props} />);

    const select = getByLabelText(props.label);
    const selectComboBox = select.querySelector('[role="combobox"]');
    selectComboBox && fireEvent.mouseDown(selectComboBox);

    options.forEach((option) => {
      const optionElement = getByText(option.label);
      expect(optionElement).toBeInTheDocument();
    });
  });

  it('calls the onChange callback when an option is selected', () => {
    const { getByLabelText, getByText } = render(<Select {...props} />);

    const select = getByLabelText(props.label);
    const selectComboBox = select.querySelector('[role="combobox"]');
    selectComboBox && fireEvent.mouseDown(selectComboBox);

    const option2 = getByText(options[1].label);
    expect(option2).toBeInTheDocument();

    fireEvent.click(option2);

    const selectInput = select?.querySelector('input');
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(selectInput).toHaveValue('option2');
  });

  it('disables the select component when disabled prop is true', () => {
    const { getByLabelText } = render(<Select {...props} disabled />);

    const select = getByLabelText(props.label);
    const selectComboBox = select.querySelector('[role="combobox"]');
    selectComboBox && fireEvent.mouseDown(selectComboBox);
    expect(selectComboBox).toHaveAttribute('aria-disabled');
  });

  it('renders error correctly', () => {
    const { getByText } = render(
      <Select {...props} error helperText="Test error" />,
    );

    const errorMessage = getByText('Test error');
    expect(errorMessage).toBeInTheDocument();
  });

  it('applies custom text props correctly', () => {
    const textProps = {
      fontSize: 18,
      fontWeight: 500,
      color: 'rgb(255, 0, 0)',
      fontFamily: "'Inter',sans-serif",
    };

    const { getByText } = render(<Select {...props} textProps={textProps} />);

    const label = getByText(props.label);
    const styles = getComputedStyle(label);

    expect(styles.fontSize).toBe('18px');
    expect(styles.fontWeight).toBe('500');
    expect(styles.color).toBe('rgb(255, 0, 0)');
    expect(styles.fontFamily).toBe("'Inter',sans-serif");
  });
});
