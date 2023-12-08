/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AppBar from '../src/components/AppBar';

describe('AppBar Component', () => {
  it('should render AppBar', () => {
    const items = [
      { id: 'testItem1', text: 'TestItem1' },
      { id: 'testItem2', text: 'TestItem2' },
      { id: 'testItem3', text: 'TestItem3' },
    ];
    render(
      <AppBar.Root>
        <AppBar.Drawer collapsable currentId="home" items={items} />
        <AppBar.Main>
          <AppBar.Nav />
        </AppBar.Main>
      </AppBar.Root>,
    );
  });

  it('renders the AppBar Drawer with correct items', () => {
    const items = [
      { id: 'testItem1', text: 'TestItem1' },
      { id: 'testItem2', text: 'TestItem2' },
      { id: 'testItem3', text: 'TestItem3' },
    ];
    const { getByText } = render(
      <AppBar.Root>
        <AppBar.Drawer collapsable currentId="home" items={items} />
        <AppBar.Main>
          <AppBar.Nav />
        </AppBar.Main>
      </AppBar.Root>,
    );

    items.forEach((item) => {
      const menuItem = getByText(item.text);
      expect(menuItem).toBeInTheDocument();
    });
  });

  it('calls the onClick function when AppBar Drawer item is clicked', () => {
    const items = [
      { id: 'testItem1', text: 'TestItem1', onClick: jest.fn() },
      { id: 'testItem2', text: 'TestItem2', onClick: jest.fn() },
      { id: 'testItem3', text: 'TestItem3', onClick: jest.fn() },
    ];
    const { getByText } = render(
      <AppBar.Root>
        <AppBar.Drawer collapsable currentId="home" items={items} />
        <AppBar.Main>
          <AppBar.Nav />
        </AppBar.Main>
      </AppBar.Root>,
    );

    const menuItem = getByText(items[0].text);
    fireEvent.click(menuItem);
    expect(menuItem.onclick).toHaveBeenCalledWith(menuItem.id);
  });

  it('renders the AppBar Nav component', () => {
    const { getByTestId } = render(
      <AppBar.Root>
        <AppBar.Drawer collapsable currentId="home" items={[]} />
        <AppBar.Main>
          <AppBar.Nav data-testid="appbar-nav" />
        </AppBar.Main>
      </AppBar.Root>,
    );

    const appBarNav = getByTestId('appbar-nav');
    expect(appBarNav).toBeInTheDocument();
  });
});
