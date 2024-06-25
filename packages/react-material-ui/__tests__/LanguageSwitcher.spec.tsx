/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import LanguageSwitcher from '../src/components/LanguageSwitcher';

import { i18n } from '../src/utils/i18n';

describe('LanguageSwitcher component', () => {
  const languages = Object.keys(i18n.store.data);

  const options: string[] = ['en-US', 'pt-BR'];

  it('should render correctly', () => {
    render(<LanguageSwitcher />);
  });

  it('renders default options correctly', () => {
    const { getByRole, getAllByRole } = render(<LanguageSwitcher />);

    const select = getByRole('combobox');
    select && fireEvent.mouseDown(select);

    const dropdownOptions = getAllByRole('option');

    expect(dropdownOptions).toHaveLength(languages.length);

    dropdownOptions.forEach((option, index) => {
      expect(option.textContent).toBe(languages[index]);
    });
  });

  it('renders options passed by props correctly', () => {
    const { getByRole, getAllByRole } = render(
      <LanguageSwitcher languages={options} />,
    );

    const select = getByRole('combobox');
    select && fireEvent.mouseDown(select);

    const dropdownOptions = getAllByRole('option');

    expect(dropdownOptions).toHaveLength(options.length);

    dropdownOptions.forEach((option, index) => {
      expect(option.textContent).toBe(options[index]);
    });
  });

  it('calls the onChange callback when an option is selected', () => {
    const { getByRole, getAllByRole } = render(
      <LanguageSwitcher languages={options} />,
    );

    const select = getByRole('combobox');
    select && fireEvent.mouseDown(select);

    const dropdownOptions = getAllByRole('option');

    const option2 = dropdownOptions[1];
    expect(option2).toBeInTheDocument();

    fireEvent.click(option2);

    expect(i18n.language).toBe(options[1]);
  });
});
