/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import Text from '../src/components/Text/Text';

describe('Text component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Text>Hello, World!</Text>);
    const text = getByText('Hello, World!');
    expect(text).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const { getByText, container } = render(
      <Text>
        <span>Hello, World!</span>
      </Text>,
    );
    const text = getByText('Hello, World!');
    expect(text).toBeInTheDocument();
  });

  it('applies default fontWeight automatically', () => {
    const { getByText } = render(<Text>Hello, World!</Text>);
    const text = getByText('Hello, World!');
    expect(text).toHaveStyle('font-weight: 300');
  });

  it('applies the specified font weight', () => {
    const { getByText } = render(<Text fontWeight="700">Bold Text</Text>);
    const text = getByText('Bold Text');
    expect(text).toHaveStyle('font-weight: 700');
  });

  it('passes additional props to Typography component', () => {
    const { getByText } = render(<Text color="#333">Colored Text</Text>);
    const text = getByText('Colored Text');
    expect(text).toHaveStyle('color: #333');
  });

  it('renders children correctly', () => {
    const { getByText, debug } = render(
      <Text color="#333">
        <span>Children</span>
      </Text>,
    );
    const text = getByText('Children');
    expect(text).toBeInTheDocument();
  });
});
