/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import AppBar from '../src/components/AppBar';

describe('AppBarRoot Component', () => {
  it('should render correctly', () => {
    render(
      <AppBar.Root>
        <div>Child Component</div>
      </AppBar.Root>,
    );
  });
  it('should render children correctly', () => {
    const { getByText } = render(
      <AppBar.Root>
        <div>Child Component</div>
      </AppBar.Root>,
    );

    const child = getByText('Child Component');
    expect(child).toBeInTheDocument();
  });
});
