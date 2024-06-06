/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import OtpInput from '../src/components/OtpInput';

describe('components/MuiOtpInput', () => {
  test('should not crash', () => {
    render(<OtpInput />);
  });

  test('should display 4 inputs by default', () => {
    render(<OtpInput />);
    expect(screen.getAllByRole('textbox').length).toBe(4);
  });

  test('should display n inputs according to the length prop', () => {
    render(<OtpInput length={5} />);
    expect(screen.getAllByRole('textbox').length).toBe(5);
  });

  test('should split value into different inputs', () => {
    render(<OtpInput value="abcd" />);

    expect(screen.getByDisplayValue('a')).toBeInTheDocument();
    expect(screen.getByDisplayValue('b')).toBeInTheDocument();
    expect(screen.getByDisplayValue('c')).toBeInTheDocument();
    expect(screen.getByDisplayValue('d')).toBeInTheDocument();
  });

  test('should split value into different inputs or let empty value', () => {
    render(<OtpInput value="ab" />);
    expect(screen.getByDisplayValue('a')).toBeInTheDocument();
    expect(screen.getByDisplayValue('b')).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('')).toHaveLength(2);
  });
});
