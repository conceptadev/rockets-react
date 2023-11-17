/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DrawerItem from '../src/components/Drawer/DrawerItem';

describe('DrawerItem Component', () => {
  it('should render correctly', () => {
    render(<DrawerItem />);
  });

  it('renders icon correctly', () => {
    const { getByTestId } = render(
      <DrawerItem icon={<div data-testid="drawer-icon" />} />,
    );

    const drawerItemIcon = getByTestId('drawer-icon');
    expect(drawerItemIcon).toBeInTheDocument();
  });

  it('renders text correctly', () => {
    const { getByText } = render(<DrawerItem text="Test Text" />);

    const drawerItemText = getByText('Test Text');
    expect(drawerItemText).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClickMock = jest.fn();
    const { getByTestId } = render(
      <DrawerItem id="item0" icon={<div />} onClick={onClickMock} />,
    );
    const drawerItem = getByTestId('drawer-item-item0-permanent');
    fireEvent.click(drawerItem);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('calls icon function with correct parameters', () => {
    const iconFunctionMock = jest.fn();
    render(<DrawerItem icon={iconFunctionMock} />);
    expect(iconFunctionMock).toHaveBeenCalledWith(false);
  });

  it('applies textProps correctly', () => {
    const { getByText } = render(
      <DrawerItem text="Test Text" textProps={{ fontSize: 16 }} />,
    );
    const drawerItemText = getByText('Test Text');
    expect(drawerItemText).toHaveStyle('font-size: 16px');
  });
});
