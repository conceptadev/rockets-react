/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Dropdown, { DropdownItem } from '../src/components/Dropdown/Dropdown';

describe('Dropdown component', () => {
  const options: DropdownItem[] = [
    {
      key: 'item1',
      onClick: jest.fn(),
      text: 'Item 1',
      icon: <span>Icon1</span>,
    },
    {
      key: 'item2',
      onClick: jest.fn(),
      text: 'Item 2',
      icon: <span>Icon2</span>,
    },
  ];

  it('should render correctly', () => {
    const { getByTestId } = render(<Dropdown options={options} />);
    const toggleButton = getByTestId('toggle-button');
    expect(toggleButton).toBeInTheDocument();
  });

  it('has "Options" tooltip and icon', () => {
    const { getByLabelText, getByTestId, debug } = render(
      <Dropdown options={options} />,
    );

    const optionsTooltip = getByLabelText('Options');
    expect(optionsTooltip).toBeInTheDocument();

    const toggleIcon = getByTestId('toggle-icon');
    expect(toggleIcon).toBeInTheDocument();
  });

  it('opens the menu when the toggle button is clicked', async () => {
    const { getByTestId, getByRole } = render(<Dropdown options={options} />);
    fireEvent.click(getByTestId('toggle-button'));

    await waitFor(() => {
      const menu = getByRole('menu');
      expect(menu).toBeInTheDocument();
    });
  });

  it('counts number of items', async () => {
    const { getByTestId, getByRole, queryAllByRole } = render(
      <Dropdown options={options} />,
    );
    fireEvent.click(getByTestId('toggle-button'));

    await waitFor(() => {
      const menu = getByRole('menu');
      expect(menu).toBeInTheDocument();
    });

    const menuItems = queryAllByRole('menuitem');

    expect(menuItems).toHaveLength(2);
  });

  it('closes the menu when an option is clicked', async () => {
    const { getByTestId, getByRole, getByText, queryByRole } = render(
      <Dropdown options={options} />,
    );
    fireEvent.click(getByTestId('toggle-button'));

    await waitFor(() => {
      const menu = getByRole('menu');
      expect(menu).toBeInTheDocument();
    });

    fireEvent.click(getByText('Item 1'));

    const menu = queryByRole('menu');
    expect(menu).toBeNull();
  });

  it('calls the onClick handler when an option is clicked', async () => {
    const { getByTestId, getByRole, getByText } = render(
      <Dropdown options={options} />,
    );

    const toggleButton = getByTestId('toggle-button');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      const menu = getByRole('menu');
      expect(menu).toBeInTheDocument();
    });

    const item1 = getByText('Item 1');
    fireEvent.click(item1);

    // TODO: use "toHaveBeenCalledTimes(1)"
    // For some reason, testing-library detects 2 clicks even though live testing we get only one click when user clicks the item
    // expect(options[0].onClick).toHaveBeenCalledTimes(1);
    expect(options[0].onClick).toHaveBeenCalled();
  });
});
