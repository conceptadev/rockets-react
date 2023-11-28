/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Navbar, { NavbarProps } from '../src/components/Navbar/Navbar';

describe('Navbar', () => {
  const defaultProps: NavbarProps = {
    drawerToggle: jest.fn(),
    showNotifications: true,
    notificationsNumber: 5,
    notificationsOnClick: jest.fn(),
    avatar: 'fakeImage.jpg',
    text: 'John Doe',
    subText: 'Admin',
    headerMenuOptions: () => (
      <div>
        <div onClick={jest.fn()}>Option 1</div>
        <div onClick={jest.fn()}>Option 2</div>
      </div>
    ),
  };

  it('should render correctly', () => {
    render(<Navbar />);
  });

  it('renders text and subText correctly', () => {
    const { getByText } = render(<Navbar {...defaultProps} />);

    const text = getByText('John Doe');
    const subText = getByText('Admin');

    expect(text).toBeInTheDocument();
    expect(subText).toBeInTheDocument();
  });

  it('calls the drawerToggle function when the drawer toggle button is clicked', () => {
    const { getByLabelText } = render(<Navbar {...defaultProps} />);
    const toggleButton = getByLabelText('open drawer');

    fireEvent.click(toggleButton);

    expect(defaultProps.drawerToggle).toHaveBeenCalled();
  });

  it('renders Avatar correctly', () => {
    const { getByAltText } = render(<Navbar {...defaultProps} />);
    const avatar = getByAltText('Avatar');

    expect(avatar).toBeInTheDocument();
  });

  it('calls the drawerToggle function when the drawer toggle button is clicked', () => {
    const { getByLabelText } = render(<Navbar {...defaultProps} />);
    const toggleButton = getByLabelText('open drawer');

    fireEvent.click(toggleButton);

    expect(defaultProps.drawerToggle).toHaveBeenCalled();
  });

  it('renders the notificationsNumber when provided and showNotifications is true', () => {
    const { getByTestId } = render(<Navbar {...defaultProps} />);

    const notificationsButton = getByTestId('badge');
    const badgeValue = notificationsButton.textContent;
    expect(badgeValue).toContain(defaultProps?.notificationsNumber?.toString());
  });

  it('hides the notificationsNumber when showNotifications is false', () => {
    const { queryByTestId } = render(
      <Navbar {...defaultProps} showNotifications={false} />,
    );

    const notificationsButton = queryByTestId('badge');
    expect(notificationsButton).not.toBeInTheDocument();
  });

  it('calls the notificationsOnClick function when the notifications button is clicked', () => {
    const { getByTestId } = render(<Navbar {...defaultProps} />);

    const notificationsButton = getByTestId('badge');
    fireEvent.click(notificationsButton);

    expect(defaultProps.notificationsOnClick).toHaveBeenCalled();
  });

  it('renders correct headerMenuOptions items', () => {
    const { getByText, getByLabelText } = render(<Navbar {...defaultProps} />);

    const navbarMenu = getByLabelText('open navbar menu');
    fireEvent.click(navbarMenu);

    const option1 = getByText('Option 1');
    const option2 = getByText('Option 2');

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it('applies sx styles correctly', () => {
    const { getByTestId } = render(
      <Navbar
        {...defaultProps}
        sx={{
          width: '200px',
          height: '100px',
        }}
      />,
    );

    const navbarContainer = getByTestId('navbarContainer');
    const styles = getComputedStyle(navbarContainer);

    expect(styles.width).toBe('200px');
    expect(styles.height).toBe('100px');
  });
});
