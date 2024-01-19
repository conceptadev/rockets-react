/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchField from '../src/components/SearchField';

describe('SearchField Component', () => {
  const props = {
    onDebouncedSearchChange: jest.fn(),
  };

  it('should render correctly', () => {
    render(<SearchField {...props} />);
  });

  it('should render the search icon correctly', () => {
    const { getByTestId } = render(<SearchField {...props} />);

    const icon = getByTestId('SearchIcon');
    expect(icon).toBeInTheDocument();
  });

  it('should render the search icon on the left if searchIconPlacement is "start"', () => {
    const { container } = render(
      <SearchField {...props} searchIconPlacement="start" />,
    );

    const startAdornment = container.querySelector(
      '.MuiInputAdornment-positionStart',
    );

    expect(startAdornment).toBeInTheDocument();
  });

  it('should render the search icon on the right if searchIconPlacement is "end"', () => {
    const { container } = render(
      <SearchField {...props} searchIconPlacement="end" />,
    );

    const startAdornment = container.querySelector(
      '.MuiInputAdornment-positionEnd',
    );

    expect(startAdornment).toBeInTheDocument();
  });

  it('should call onChange callback when input value changes', async () => {
    const { container } = render(<SearchField {...props} />);

    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
    fireEvent.change(input!, { target: { value: 'test' } });

    await waitFor(() => {
      expect(props.onDebouncedSearchChange).toHaveBeenCalledTimes(1);
    });

    expect(props.onDebouncedSearchChange).toHaveBeenCalledTimes(1);
  });

  it('should display the provided placeholder text', () => {
    const { getByPlaceholderText } = render(
      <SearchField {...props} placeholder="Test Placeholder" />,
    );

    const placeholder = getByPlaceholderText('Test Placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  it('should call onClear callback when the clear button is clicked', () => {
    const onClear = jest.fn();
    const { getByTestId } = render(
      <SearchField {...props} onClear={onClear} />,
    );

    const clearButton = getByTestId('ClearIcon');
    const clearButtonParent = clearButton.parentElement;
    fireEvent.click(clearButtonParent!);

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
