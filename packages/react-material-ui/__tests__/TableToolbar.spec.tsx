/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import TableToolbar from '../src/components/Table/TableToolbar';

describe('TableToolbar component', () => {
  it('should render correctly', () => {
    const { container } = render(<TableToolbar numSelected={6} />);
    const toolbar = container.querySelector('.MuiToolbar-root');
    expect(toolbar).toBeInTheDocument();
  });

  it('should render the correct number of selected items', () => {
    const { getByText } = render(<TableToolbar numSelected={6} />);
    const selectedItems = getByText('6 selected');
    expect(selectedItems).toBeInTheDocument();
  });

  it('should not render the toolbar when no items are selected', () => {
    const { container } = render(<TableToolbar numSelected={0} />);
    const toolbar = container.querySelector('.MuiToolbar-root');
    expect(toolbar).toBeEmptyDOMElement();
  });
});
