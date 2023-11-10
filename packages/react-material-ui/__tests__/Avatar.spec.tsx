/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Avatar from '../src/components/Avatar/Avatar';

describe('Avatar Component', () => {
  const props = {
    src: '',
    alt: 'Test Alt Text',
    size: 50,
    onClick: jest.fn(),
  };

  it('should render correctly', () => {
    const { getByAltText } = render(<Avatar {...props} />);
    const avatarImage = getByAltText(props.alt);

    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', props.src);
  });

  it('calls the onClick function when clicked', () => {
    const { getByAltText } = render(<Avatar {...props} />);
    const avatarImage = getByAltText(props.alt);
    fireEvent.click(avatarImage);
    expect(props.onClick).toHaveBeenCalled();
  });

  it('renders the avatar image with the correct size', () => {
    const { getByAltText } = render(<Avatar {...props} />);
    const avatarImage = getByAltText(props.alt);
    expect(avatarImage).toHaveStyle(`width: ${props.size}px`);
    expect(avatarImage).toHaveStyle(`height: ${props.size}px`);
  });
});
