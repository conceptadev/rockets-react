/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import HeaderAccount from '../src/components/HeaderAccount/HeaderAccount';

describe('HeaderAccount component', () => {
  const defaultText = 'John Doe';
  const defaultSubText = 'johndoe@example.com';
  const defaultAvatar = 'path/to/avatar.jpg';

  it('renders without crashing', () => {
    render(<HeaderAccount />);
  });

  it('renders text correctly', () => {
    const { getByText } = render(<HeaderAccount text={defaultText} />);
    const text = getByText(defaultText);
    expect(text).toBeInTheDocument();
  });

  it('renders subText correctly', () => {
    const { getByText } = render(<HeaderAccount subText={defaultSubText} />);
    const subtex = getByText(defaultSubText);
    expect(subtex).toBeInTheDocument();
  });

  it('renders avatar correctly', () => {
    const { getByAltText } = render(<HeaderAccount avatar={defaultAvatar} />);
    const avatar = getByAltText('Avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('calls the onClick handler when the button is clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <HeaderAccount text={defaultText} onClick={onClickMock} />,
    );
    fireEvent.click(getByText(defaultText));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('opens the menu when the button is clicked and menuOptions is provided', async () => {
    const menuOptions = jest.fn().mockReturnValue(<div>Menu Options</div>);
    const { getByText } = render(
      <HeaderAccount text={defaultText} menuOptions={menuOptions} />,
    );
    fireEvent.click(getByText(defaultText));

    await waitFor(() => {
      const menuOptions = getByText('Menu Options');
      expect(menuOptions).toBeInTheDocument();
    });
  });

  it('calls the menuOptions function and closes the menu when an option is clicked', async () => {
    const mockMenuOnClick = jest.fn();
    const menuOptions = jest.fn().mockImplementation((handleClose) => (
      <div
        onClick={() => {
          mockMenuOnClick();
          handleClose();
        }}
      >
        Menu Options
      </div>
    ));

    const { getByText, queryByText } = render(
      <HeaderAccount text={defaultText} menuOptions={menuOptions} />,
    );
    const text = getByText(defaultText);
    fireEvent.click(text);

    await waitFor(() => {
      const menuOptionsBtn = getByText('Menu Options');
      expect(menuOptionsBtn).toBeInTheDocument();
    });

    const menuOptionsBtn = getByText('Menu Options');
    fireEvent.click(menuOptionsBtn);

    await waitFor(() => {
      const menuOptionsBtn = queryByText('Menu Options');
      expect(menuOptionsBtn).toBeNull();
    });

    expect(mockMenuOnClick).toHaveBeenCalledTimes(1);
  });
});
