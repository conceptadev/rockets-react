/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import AppBar from '../src/components/AppBar';

describe('AppBarDrawer Component', () => {
  const items = [
    {
      icon: 'item1',
      text: 'Item 1',
      onClick: jest.fn(),
    },
    {
      icon: 'item2',
      text: 'Item 2',
      onClick: jest.fn(),
    },
  ];

  it('should render correctly', () => {
    render(
      <AppBar.Root>
        <AppBar.Drawer items={items} />
      </AppBar.Root>,
    );
  });

  it('should render items correctly', () => {
    const { getAllByText } = render(
      <AppBar.Root>
        <AppBar.Drawer items={items} />
      </AppBar.Root>,
    );

    const item1 = getAllByText(items[0].text);
    expect(item1.length).toBe(2); // Mobile and Desktop

    const item2 = getAllByText(items[1].text);
    expect(item2.length).toBe(2); // Mobile and Desktop
  });
});
