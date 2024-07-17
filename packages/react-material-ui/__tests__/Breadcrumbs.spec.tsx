/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';

import Breadcrumbs from '../src/components/Breadcrumbs';

jest.mock('next/navigation', () => ({
  usePathname: () => '/route-1/route-2',
}));

describe('Dialog Component', () => {
  const customPathname = '/test1/test2';

  it('should render correctly without props', () => {
    render(<Breadcrumbs />);
  });

  it('should render correctly with props', () => {
    render(<Breadcrumbs customPathname={customPathname} />);
  });

  it('should render correctly without props', () => {
    const { queryAllByRole } = render(<Breadcrumbs />);

    const listItems = queryAllByRole('listitem');

    expect(listItems).toHaveLength(2);
  });

  it('should render correctly with props', () => {
    const { queryAllByRole } = render(
      <Breadcrumbs customPathname={customPathname} />,
    );

    const listItems = queryAllByRole('listitem');

    expect(listItems).toHaveLength(2);
  });

  it('should render correct tags without props', () => {
    const { getByText } = render(<Breadcrumbs />);

    expect(getByText('Route 1')).toBeInTheDocument();
    expect(getByText('Route 2')).toBeInTheDocument();
  });

  it('should render correct tags with props', () => {
    const { getByText } = render(
      <Breadcrumbs customPathname={customPathname} />,
    );

    expect(getByText('Test1')).toBeInTheDocument();
    expect(getByText('Test2')).toBeInTheDocument();
  });
});
