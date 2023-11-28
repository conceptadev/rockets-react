/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Notifications from '../src/components/Notifications/Notifications';

describe('Notifications', () => {
  it('should render correctly', () => {
    render(<Notifications amount={5} />);
  });

  it('renders the correct badge amount', () => {
    const { getByTestId } = render(<Notifications amount={5} />);

    const notificationsButton = getByTestId('badge');
    const badgeValue = notificationsButton.textContent;
    expect(badgeValue).toContain('5');
  });

  it('calls the onClick function when the button is clicked', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Notifications amount={10} onClick={onClick} />,
    );

    const button = getByTestId('badge');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
