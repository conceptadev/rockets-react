/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import Filter, { FilterType } from '../src/components/Filter/Filter';

describe('Filter Component', () => {
  it('renders textfield component if type is "Text"', () => {
    const { getByPlaceholderText } = render(
      <Filter
        filters={[
          {
            type: FilterType['Text'],
            placeholder: 'Test Placeholder',
            onChange: jest.fn(),
          },
        ]}
      />,
    );

    const input = getByPlaceholderText('Test Placeholder');
    expect(input).toHaveClass('MuiInputBase-input');
  });

  it('renders autocomplete component if type is "Autocomplete"', () => {
    const { getByRole } = render(
      <Filter
        filters={[
          {
            type: FilterType['Autocomplete'],
            options: [
              {
                label: 'Test',
                value: 'test',
              },
            ],
            label: 'Test Label',
            onChange: jest.fn(),
            isLoading: false,
          },
        ]}
      />,
    );

    const input = getByRole('combobox');
    expect(input).toHaveClass('MuiAutocomplete-input');
  });

  it('renders select component if type is "Select"', () => {
    const { getByLabelText } = render(
      <Filter
        filters={[
          {
            type: FilterType['Select'],
            options: [
              {
                label: 'Test',
                value: 'test',
              },
            ],
            label: 'Test Label',
            onChange: jest.fn(),
          },
        ]}
      />,
    );

    const input = getByLabelText('Test Label');
    expect(input).toHaveClass('MuiSelect-select');
  });

  it('renders array of filters correctly', () => {
    const { container } = render(
      <Filter
        filters={[
          {
            type: FilterType['Text'],
            placeholder: 'Text Test Placeholder',
            onChange: jest.fn(),
          },
          {
            type: FilterType['Autocomplete'],
            options: [
              {
                label: 'Autocomplete Test',
                value: 'autocompleteTest',
              },
            ],
            label: 'Autocomplete Test Label',
            onChange: jest.fn(),
            isLoading: false,
          },
          {
            type: FilterType['Select'],
            options: [
              {
                label: 'Test',
                value: 'test',
              },
            ],
            label: 'Select Test Label',
            onChange: jest.fn(),
          },
        ]}
      />,
    );

    const inputs = container.querySelectorAll('input');

    expect(inputs.length).toBe(3);

    const textInput = inputs[0];
    expect(textInput).toHaveClass('MuiInputBase-input');
    expect(textInput).toBeInTheDocument();

    const autocompleteInput = inputs[1];
    expect(autocompleteInput).toHaveClass('MuiAutocomplete-input');

    const input = inputs[2];
    expect(input).toHaveClass('MuiSelect-nativeInput');
  });
});
