/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Link from '../src/components/Link/Link';

describe('Link component', () => {
  it('should render correctly', () => {
    render(<Link />);
  });

  it('renders children correctly', () => {
    const { getByText } = render(<Link>Test Link</Link>);
    const link = getByText('Test Link');
    expect(link).toBeInTheDocument();
  });

  it('applies custom color correctly', () => {
    const { getByText } = render(<Link color="#ffcc00">Test Link</Link>);
    const link = getByText('Test Link');
    expect(link).toHaveStyle('color: #ffcc00');
  });

  it('applies default color correctly', () => {
    const { getByText } = render(<Link>Test Link</Link>);
    const link = getByText('Test Link');
    expect(link).toHaveStyle('color: rgb(21, 101, 192)');
  });

  it('triggers onClick event correctly', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Link onClick={handleClick}>Test Link</Link>);
    const link = getByText('Test Link');
    fireEvent.click(link);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
