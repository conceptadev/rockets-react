/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Filter, FilterType } from '../src/components/Filter/Filter';

const SETTINGS_KEY = 'testing';

describe('Filter Component', () => {
  const allFilters: FilterType[] = [
    {
      id: 'text',
      label: 'Text',
      type: 'text',
      placeholder: 'Text Test Placeholder',
      onChange: jest.fn(),
    },
    {
      id: 'autocomplete',
      type: 'autocomplete',
      options: [
        {
          label: 'Autocomplete Test',
          value: 'autocompleteTest',
        },
      ],
      label: 'Autocomplete Test Label',
      value: undefined,
      onChange: jest.fn(),
      isLoading: false,
    },
    {
      id: 'select',
      type: 'select',
      options: [
        {
          label: 'Test',
          value: 'test',
        },
      ],
      label: 'Select Test Label',
      onChange: jest.fn(),
    },
  ];

  beforeEach(() => {
    localStorage.removeItem('filterSettings');
  });

  it('renders textfield component if type is "Text"', () => {
    const { getByPlaceholderText } = render(
      <Filter filters={[allFilters[0]]} orderableListCacheKey={SETTINGS_KEY} />,
    );

    const input = getByPlaceholderText('Text Test Placeholder');
    expect(input).toHaveClass('MuiInputBase-input');
  });

  it('renders autocomplete component if type is "Autocomplete"', () => {
    const { getByRole } = render(
      <Filter filters={[allFilters[1]]} orderableListCacheKey={SETTINGS_KEY} />,
    );

    const input = getByRole('combobox');
    expect(input).toHaveClass('MuiAutocomplete-input');
  });

  it('renders select component if type is "Select"', () => {
    const { getByLabelText } = render(
      <Filter filters={[allFilters[2]]} orderableListCacheKey={SETTINGS_KEY} />,
    );

    const input = getByLabelText('Select Test Label');
    expect(input).toHaveClass('MuiSelect-select');
  });

  it('renders array of filters correctly', () => {
    const { container } = render(
      <Filter filters={allFilters} orderableListCacheKey={SETTINGS_KEY} />,
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

  it('renders dropdown button', () => {
    const { queryByTestId } = render(
      <Filter filters={allFilters} orderableListCacheKey={SETTINGS_KEY} />,
    );

    const dropdownButton = queryByTestId('FilterAltIcon');
    expect(dropdownButton).toBeInTheDocument();
  });

  it('opens dropdown button on click', () => {
    const { queryByTestId, queryAllByTestId } = render(
      <Filter filters={allFilters} orderableListCacheKey={SETTINGS_KEY} />,
    );

    const dropdownButton = queryByTestId('FilterAltIcon');
    dropdownButton && fireEvent.click(dropdownButton);

    const filterItems = queryAllByTestId('orderable-item');
    expect(filterItems.length).toBe(3);

    filterItems.forEach((item, index) => {
      expect(item).toHaveTextContent(allFilters[index].label);
    });
  });

  it('Hides filter on checkbox click', async () => {
    const {
      queryByTestId,
      getByPlaceholderText,
      getByRole,
      queryByPlaceholderText,
    } = render(
      <Filter filters={[allFilters[0]]} orderableListCacheKey={SETTINGS_KEY} />,
    );

    const textInput = getByPlaceholderText('Text Test Placeholder');
    expect(textInput).toBeInTheDocument();

    const dropdownButton = queryByTestId('FilterAltIcon');
    dropdownButton && fireEvent.click(dropdownButton);

    const textCheckbox = getByRole('checkbox');
    textCheckbox && fireEvent.click(textCheckbox);

    await waitFor(() => {
      const missingHiddenInput = queryByPlaceholderText(
        'Text Test Placeholder',
      );
      expect(missingHiddenInput).not.toBeInTheDocument();
    });
  });
});
