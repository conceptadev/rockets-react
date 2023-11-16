/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Checkbox from '../src/components/Checkbox/Checkbox';

describe('Checkbox Component', () => {
  test('should render correctly', () => {
    const { getByLabelText, getByText } = render(
      <Checkbox label="Test Label" checked={false} onChange={() => {}} />,
    );

    const checkbox = getByLabelText('Test Label');
    const label = getByText('Test Label');

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  test('should render without label', () => {
    const { getByRole } = render(
      <Checkbox checked={false} onChange={() => {}} />,
    );

    const checkbox = getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
  });

  test('should render as checked', () => {
    const { getByLabelText } = render(
      <Checkbox label="Test Label" checked={true} onChange={() => {}} />,
    );

    const checkbox = getByLabelText('Test Label');

    expect(checkbox).toBeChecked();
  });

  test('should render as unchecked', () => {
    const { getByLabelText } = render(
      <Checkbox label="Test Label" checked={false} onChange={() => {}} />,
    );

    const checkbox = getByLabelText('Test Label');

    expect(checkbox).not.toBeChecked();
  });

  test('adds asterisk to label when required', () => {
    const { getByText } = render(
      <Checkbox
        label="Test Label"
        checked={false}
        required={true}
        onChange={() => {}}
      />,
    );

    const label = getByText('Test Label *');

    expect(label).toBeInTheDocument();
  });

  test('calls onChange handler when checkbox is clicked', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <Checkbox label="Test Label" checked={false} onChange={handleChange} />,
    );

    const checkbox = getByLabelText('Test Label');

    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    expect(handleChange).toHaveBeenCalled();
  });
});
