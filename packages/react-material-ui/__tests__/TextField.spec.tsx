/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextField from '../src/components/TextField/TextField';

describe('TextField Component', () => {
  it('should render correctly', () => {
    render(<TextField />);
  });

  it('renders label correctly', () => {
    const { getByText } = render(<TextField label="Test Label" />);
    const labelElement = getByText('Test Label');
    expect(labelElement).toBeInTheDocument();
  });

  it('renders required label correctly', () => {
    const { getByText } = render(<TextField label="Test Label" required />);
    const label = getByText('Test Label *');
    expect(label).toBeInTheDocument();
  });

  it('should toggle password visibility', () => {
    const { getByTestId } = render(
      <TextField label="Password" type="password" />,
    );
    const wrapper = getByTestId('text-field');
    const toggleButton = getByTestId('toggle-password-button');

    const input = wrapper.querySelector('input');
    fireEvent.click(toggleButton);
    expect(input?.getAttribute('type')).toBe('text');

    fireEvent.click(toggleButton);
    expect(input?.getAttribute('type')).toBe('password');
  });

  it('renders the correct value', () => {
    const { getByTestId } = render(
      <TextField label="Test Input" value="Test Value" />,
    );
    const wrapper = getByTestId('text-field');
    const input = wrapper.querySelector('input');
    input && fireEvent.change(input, { target: { value: 'Test Value' } });
    expect(input).toHaveValue('Test Value');
  });

  it('calls onChange when input value changes', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <TextField label="Test Input" onChange={onChangeMock} />,
    );
    const wrapper = getByTestId('text-field');
    const input = wrapper.querySelector('input');
    input && fireEvent.change(input, { target: { value: 'Test Value' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('renders as a multiline text field if multiline is true', () => {
    const { getByTestId } = render(<TextField label="Test Input" multiline />);

    const wrapper = getByTestId('text-field');
    const input = wrapper.querySelector('input');
    expect(input).not.toBeInTheDocument();

    const textarea = wrapper.querySelector('textarea');
    expect(textarea).toBeInTheDocument();
  });

  it('renders the multiline with passed props', () => {
    const { getByTestId, debug } = render(
      <TextField label="Test Input" multiline rows={5} maxRows={10} />,
    );

    const wrapper = getByTestId('text-field');
    const textarea = wrapper.querySelector('textarea');

    expect(textarea).toHaveAttribute('rows', '5');
    debug();
  });

  it('renders TextField with small size as default', () => {
    const { getByTestId } = render(<TextField label="Test Label" />);

    const wrapper = getByTestId('text-field');
    const input = wrapper.querySelector('input');

    expect(input).toHaveClass('MuiInputBase-inputSizeSmall');
  });

  it('renders TextField with small size as default', () => {
    const { queryByText } = render(
      <TextField label="Test Label" hiddenLabel />,
    );

    const labelElement = queryByText('Test Label');
    expect(labelElement).not.toBeInTheDocument();
  });
});
