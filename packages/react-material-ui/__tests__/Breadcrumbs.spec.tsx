/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';

import Breadcrumbs from '../src/components/Breadcrumbs';

describe('Dialog Component', () => {
  const routes = [
    { href: '/', label: 'Home' },
    { href: '/users', label: 'Users' },
  ];

  it('should render correctly', () => {
    render(<Breadcrumbs routes={routes} />);
  });

  it('should render correct number of list items', () => {
    const { queryAllByRole } = render(<Breadcrumbs routes={routes} />);

    const listItems = queryAllByRole('listitem');

    expect(listItems).toHaveLength(2);
  });

  it('should render correct text items', () => {
    const { getByText } = render(<Breadcrumbs routes={routes} />);

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Users')).toBeInTheDocument();
  });
});
