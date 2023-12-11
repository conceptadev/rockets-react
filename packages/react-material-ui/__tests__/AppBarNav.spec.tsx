/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AppBar from '../src/components/AppBar';

describe('AppBar.Nav Component', () => {
  it('should render correctly', () => {
    render(
      <AppBar.Root>
        <AppBar.Main>
          <AppBar.Nav text="Test Text" subText="Test subtext" />
          <div>Child Component</div>
        </AppBar.Main>
      </AppBar.Root>,
    );
  });

  it('should render children correctly', () => {
    const { getByText } = render(
      <AppBar.Root>
        <AppBar.Main>
          <AppBar.Nav text="Test Text" subText="Test Subtext" />
          <div>Child Component</div>
        </AppBar.Main>
      </AppBar.Root>,
    );
    const testText = getByText('Test Text');
    expect(testText).toBeInTheDocument();

    const testSubtext = getByText('Test Subtext');
    expect(testSubtext).toBeInTheDocument();
  });

  it('should call toggleMobileOpen when drawerToggle is clicked', () => {
    const items = [
      {
        icon: 'item1',
        text: 'Item 1',
        onClick: () => {},
      },
      {
        icon: 'item2',
        text: 'Item2',
        onClick: () => {},
      },
    ];

    const { getByTestId, getByRole, queryByRole } = render(
      <AppBar.Root>
        <AppBar.Drawer items={items} />
        <AppBar.Main>
          <AppBar.Nav text="Test Text" subText="Test subtext" />
          <div>Child Component</div>
        </AppBar.Main>
      </AppBar.Root>,
    );

    const closedDrawer = queryByRole('presentation');
    expect(closedDrawer).not.toBeInTheDocument();

    const drawerToggle = getByTestId('navbarContainer').querySelector(
      '[aria-label="open drawer"]',
    );
    fireEvent.click(drawerToggle!);

    const openDrawer = getByRole('presentation');
    expect(openDrawer).toBeInTheDocument();
  });
});
