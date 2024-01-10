/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import AppBar from '../src/components/AppBar';

describe('AppBar Component', () => {
  const items = [
    { id: 'testItem1', text: 'TestItem1' },
    { id: 'testItem2', text: 'TestItem2' },
    { id: 'testItem3', text: 'TestItem3' },
  ];

  it('should render correctly', () => {
    render(
      <AppBar.Root>
        <AppBar.Drawer collapsable currentId="home" items={items} />
        <AppBar.Main>
          <AppBar.Nav text="Test Text" subText="Test Subtext" />
          <div>Child Component</div>
        </AppBar.Main>
      </AppBar.Root>,
    );
  });

  it('should render drawer correctly', () => {
    const { getByRole, getAllByText } = render(
      <AppBar.Root>
        <AppBar.Drawer collapsable currentId="home" items={items} />
        <AppBar.Main>
          <AppBar.Nav text="Test Text" subText="Test Subtext" />
          <div>Child Component</div>
        </AppBar.Main>
      </AppBar.Root>,
    );

    const main = getByRole('main');
    expect(main).toBeInTheDocument();

    const item1 = getAllByText(items[0].text);
    expect(item1.length).toBe(2);

    const item2 = getAllByText(items[1].text);
    expect(item2.length).toBe(2);
  });
});
