/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Avatar from '../src/components/Avatar/Avatar';

describe('Avatar Component', () => {
  const props = {
    src: 'test.jpg',
    alt: 'Test Alt Text',
    initials: 'AB',
    size: 50,
    onClick: jest.fn(),
  };

  it('should render correctly', () => {
    const { getByAltText } = render(<Avatar {...props} />);
    const avatarImage = getByAltText(props.alt);

    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', props.src);
  });

  it('renders initials when no image is provided', () => {
    const { getByText } = render(<Avatar initials="AB" />);
    expect(getByText('AB')).toBeInTheDocument();
  });

  it('handles image loading error', () => {
    const { getByAltText } = render(<Avatar {...props} />);
    const avatarImage = getByAltText(props.alt);
    fireEvent.error(avatarImage);
    expect(avatarImage).toHaveStyle('display: none');
  });

  it('calls the onClick function when clicked', () => {
    const { getByAltText } = render(<Avatar {...props} />);
    const avatarImage = getByAltText(props.alt);
    fireEvent.click(avatarImage);
    expect(props.onClick).toHaveBeenCalled();
  });

  it('calls onClick when avatar is clicked', () => {
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
