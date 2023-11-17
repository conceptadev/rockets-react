/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Drawer from '../src/components/Drawer/Drawer';

describe('Drawer Component', () => {
  const mockItems = [
    { id: 'item1', text: 'Item 1', onClick: jest.fn() },
    { id: 'item2', text: 'Item 2', onClick: jest.fn() },
  ];

  it('renders with required props', () => {
    const { getByTestId } = render(<Drawer items={mockItems} />);
    const drawer = getByTestId('drawer');
    expect(drawer).toBeInTheDocument();
  });

  it('renders logo when provided', () => {
    const { container } = render(<Drawer items={mockItems} logo="/logo.png" />);
    const logoElement = container.querySelector('img[src="/logo.png"]');
    expect(logoElement).toBeInTheDocument();
  });

  it('calls onClick of DrawerItem when clicked', () => {
    const { getByTestId } = render(<Drawer items={mockItems} />);

    const itemButton = getByTestId('drawer-item-item1-permanent');
    fireEvent.click(itemButton);
    expect(mockItems[0].onClick).toHaveBeenCalled();
  });

  it('calls customToggle when provided', () => {
    const customToggleMock = jest.fn();
    render(<Drawer items={mockItems} customToggle={customToggleMock} />);

    expect(customToggleMock).toHaveBeenCalled();
  });
});
