/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import OrderableDropDown, {
  ListItem,
} from '../src/components/OrderableDropDown';

describe('OrderableDropDown Component', () => {
  const list: ListItem[] = [
    { id: 'test-0', label: 'Test 0' },
    { id: 'test-1', label: 'Test 1' },
    { id: 'test-2', label: 'Test 2' },
    { id: 'test-3', label: 'Test 3' },
    { id: 'test-4', label: 'Test 4' },
  ];

  it('should render correctly', () => {
    const { getByTestId } = render(
      <OrderableDropDown list={list} setList={jest.fn()} />,
    );

    const dropDownButton = getByTestId('SettingsSuggestIcon');
    expect(dropDownButton).toBeInTheDocument();
  });

  it('should render list items correctly', () => {
    const { getByTestId, getByText } = render(
      <OrderableDropDown list={list} setList={jest.fn()} />,
    );

    const dropDownButton = getByTestId('SettingsSuggestIcon');
    dropDownButton && fireEvent.click(dropDownButton);

    list.map((item) => {
      const listItem = getByText(item.label);
      expect(listItem).toBeInTheDocument();
    });
  });

  it('fires the “setList” function on checkbox click', () => {
    const setList = jest.fn();

    const { getByTestId, getByRole } = render(
      <OrderableDropDown list={list} setList={setList} />,
    );

    const dropDownButton = getByTestId('SettingsSuggestIcon');
    dropDownButton && fireEvent.click(dropDownButton);

    const checkbox = getByRole('checkbox', { name: 'Test 0' });
    checkbox && fireEvent.click(checkbox);

    expect(setList).toHaveBeenCalledTimes(1);
  });
});
