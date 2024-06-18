/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import LanguageSwitcher from '../src/components/LanguageSwitcher';

import { i18n, languages } from '../src/utils/i18n';

describe('LanguageSwitcher component', () => {
  const options: string[] = ['pt-BR', 'en-US'];

  it('should render correctly', () => {
    render(<LanguageSwitcher />);
  });

  it('renders default options correctly', () => {
    const { getByTestId, getByText } = render(<LanguageSwitcher />);

    const select = getByTestId('language-switcher');
    const selectComboBox = select.querySelector('[role="combobox"]');
    selectComboBox && fireEvent.mouseDown(selectComboBox);

    languages.forEach((option) => {
      const optionElement = getByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });

  it('renders options passed by props correctly', () => {
    const { getByTestId, getByText } = render(
      <LanguageSwitcher languages={options} />,
    );

    const select = getByTestId('language-switcher');
    const selectComboBox = select.querySelector('[role="combobox"]');
    selectComboBox && fireEvent.mouseDown(selectComboBox);

    languages.forEach((option) => {
      const optionElement = getByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });

  it('calls the onChange callback when an option is selected', () => {
    const { getByTestId, getByText } = render(<LanguageSwitcher />);

    const select = getByTestId('language-switcher');
    const selectComboBox = select.querySelector('[role="combobox"]');
    selectComboBox && fireEvent.mouseDown(selectComboBox);

    const option2 = getByText(languages[1]);
    expect(option2).toBeInTheDocument();

    fireEvent.click(option2);

    expect(i18n.language).toBe(languages[1]);
  });
});
