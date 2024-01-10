/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import AppBar from '../src/components/AppBar';

describe('AppBarMain Component', () => {
  it('should render correctly', () => {
    render(
      <AppBar.Root>
        <AppBar.Main>
          <div>Child Component</div>
        </AppBar.Main>
      </AppBar.Root>,
    );
  });

  it('should render children correctly', () => {
    const { getByText } = render(
      <AppBar.Root>
        <AppBar.Main>
          <div>Child Component</div>
        </AppBar.Main>
      </AppBar.Root>,
    );

    const child = getByText('Child Component');
    expect(child).toBeInTheDocument();
  });

  it('renders "main" component', () => {
    const { getByRole } = render(
      <AppBar.Root>
        <AppBar.Main>
          <div>Child Component</div>
        </AppBar.Main>
      </AppBar.Root>,
    );

    const main = getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('applies sx prop correctly', () => {
    const sx = {
      backgroundColor: 'red',
      width: '200px',
    };
    const { getByRole } = render(
      <AppBar.Root>
        <AppBar.Main sx={sx}>
          <div>Child Component</div>
        </AppBar.Main>
      </AppBar.Root>,
    );

    const main = getByRole('main');
    const styles = window.getComputedStyle(main);

    expect(styles.backgroundColor).toBe('red');
    expect(styles.width).toBe('200px');
  });
});
