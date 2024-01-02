/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TableOptions from '../src/components/Table/TableOptions';

describe('TableOptions component', () => {
  const props = {
    row: { id: '1', name: 'test', email: 'test@test.com' },
    customRowOptions: [
      { key: 'item1', text: 'Item 1', onClick: () => jest.fn() },
      { key: 'item2', text: 'Item 2', onClick: () => jest.fn() },
    ],
  };

  it('should render correctly', () => {
    const { getByTestId } = render(<TableOptions {...props} />);
    const menuButton = getByTestId('fade-button');
    expect(menuButton).toBeInTheDocument();
  });

  it('should render menu open correctly', () => {
    const { getByTestId, queryByTestId } = render(<TableOptions {...props} />);
    const menu = queryByTestId('fade-menu');
    const menuButton = getByTestId('fade-button');

    expect(menu).not.toBeInTheDocument();

    fireEvent.click(menuButton);

    const menuAfterClick = queryByTestId('fade-menu');
    expect(menuAfterClick).toBeInTheDocument();
  });

  it('should render custom row options correctly', () => {
    const { getByTestId, getByText } = render(<TableOptions {...props} />);
    const menuButton = getByTestId('fade-button');

    fireEvent.click(menuButton);

    const item1 = getByText('Item 1');
    const item2 = getByText('Item 2');

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  it('should render custom row options as a function correctly', async () => {
    const { getByTestId, getByText, queryByText } = render(
      <TableOptions
        {...props}
        customRowOptions={({ row, close }) => (
          <div>
            <button onClick={close}>Item A</button>
            <button onClick={close}>Item B</button>
          </div>
        )}
      />,
    );
    const menuButton = getByTestId('fade-button');

    fireEvent.click(menuButton);

    const itemA = getByText('Item A');
    const itemB = getByText('Item B');

    expect(itemA).toBeInTheDocument();
    expect(itemB).toBeInTheDocument();

    fireEvent.click(itemB);

    await waitFor(() => {
      const itemBAfterClick = queryByText('Item B');
      expect(itemBAfterClick).not.toBeInTheDocument();
    });
  });

  it('should apply horizontal toggle direction by default', () => {
    const { getByTestId } = render(<TableOptions {...props} />);
    const horizontalIcon = getByTestId('MoreHorizIcon');

    expect(horizontalIcon).toBeInTheDocument();
  });

  it('should apply vertical toggle direction correctly if passed', () => {
    const { getByTestId } = render(
      <TableOptions {...props} toggleDirection="vertical" />,
    );
    const horizontalIcon = getByTestId('MoreVertIcon');

    expect(horizontalIcon).toBeInTheDocument();
  });
});
