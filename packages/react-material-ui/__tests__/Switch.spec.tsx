/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Switch from '../src/components/Switch/Switch';

describe('Switch Component', () => {
  it('should render correctly', () => {
    const { getByLabelText } = render(<Switch label="Test Label" />);
    const switchInput = getByLabelText('Test Label');

    expect(switchInput).toBeInTheDocument();
  });

  it('renders the label correctly', () => {
    const { getByText } = render(<Switch label="Test Label" />);
    const labelText = getByText('Test Label');

    expect(labelText).toBeInTheDocument();
  });

  it('renders * in label if is "required"', () => {
    const { getByText } = render(<Switch label="Test Label" required />);
    const labelText = getByText('Test Label *');

    expect(labelText).toBeInTheDocument();
  });

  it('textProps are passed correctly', () => {
    const textProps = {
      fontSize: '20px',
      fontWeight: '600',
      color: 'rgb(255, 0, 0)',
    };

    const { getByText } = render(
      <Switch label="Test Label" textProps={textProps} />,
    );
    const labelText = getByText('Test Label');

    const styles = getComputedStyle(labelText);

    expect(styles.fontSize).toBe(textProps.fontSize);
    expect(styles.fontWeight).toBe(textProps.fontWeight);
    expect(styles.color).toBe(textProps.color);
  });

  it('should call the onChange function when clicked', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Switch onChange={onChange} label="Test Label" />,
    );
    const switchInput = getByLabelText('Test Label');
    fireEvent.click(switchInput);

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('value changes on click', () => {
    const { getByLabelText } = render(<Switch label="Test Label" />);
    const switchInput = getByLabelText('Test Label');

    expect(switchInput).not.toBeChecked();

    fireEvent.click(switchInput);

    expect(switchInput).toBeChecked();
  });

  it('disables the input if "disable" is true', () => {
    const { getByLabelText } = render(<Switch label="Test Label" disabled />);
    const switchInput = getByLabelText('Test Label');

    expect(switchInput).toBeDisabled();
  });
});
